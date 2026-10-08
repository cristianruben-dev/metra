'use server'

import { renderPasswordResetEmail } from '@/components/emails/password-reset-email'
import { FROM_EMAIL, transporter } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

function generateOTP(): string {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function forgotPasswordAction(email: string) {
	try {
		const parsedEmail = z.string().max(254).email().safeParse(email)
		if (!parsedEmail.success) {
			return { error: 'Invalid email address' }
		}
		const normalizedEmail = parsedEmail.data.toLowerCase()

		const user = await prisma.user.findUnique({
			where: { email: normalizedEmail },
		})

		if (!user) {
			return {
				success: true,
				message: 'If the email exists, a reset code has been sent',
			}
		}

		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
		const recentTokens = await prisma.passwordResetToken.count({
			where: {
				email: normalizedEmail,
				createdAt: { gte: oneHourAgo },
			},
		})

		if (recentTokens >= 3) {
			return { error: 'Too many reset requests. Please try again later.' }
		}

		const code = generateOTP()
		const token = crypto.randomUUID()
		const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

		const resetToken = await prisma.passwordResetToken.create({
			data: { email: normalizedEmail, token, code, expiresAt },
		})

		try {
			const emailHtml = renderPasswordResetEmail(code)
			await transporter.sendMail({
				from: FROM_EMAIL,
				to: normalizedEmail,
				subject: 'Código de Verificación - Restablecer Contraseña',
				html: emailHtml,
			})
		} catch (emailError) {
			console.error('Error sending email:', emailError)
			await prisma.passwordResetToken.delete({ where: { id: resetToken.id } })
			return { error: 'Failed to send email. Please try again.' }
		}

		return { success: true, token: resetToken.token }
	} catch (error) {
		console.error('Error in forgotPasswordAction:', error)
		return { error: 'Internal server error' }
	}
}
