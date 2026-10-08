function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		}

		return entities[character] ?? character
	})
}

export function renderPasswordResetEmail(code: string): string {
	const safeCode = escapeHtml(code)

	return `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Código de verificación</title>
	</head>
	<body style="margin: 0; padding: 20px; font-family: Arial, Helvetica, sans-serif;">
		<div style="display: none; max-height: 0; overflow: hidden;">
			Tu código de verificación es ${safeCode}
		</div>
		<div style="max-width: 600px; margin: 0 auto;">
			<p>Hola,</p>
			<p>Tu código de restablecimiento es: <strong>${safeCode}</strong></p>
			<p>Este código expira en 15 minutos.</p>
		</div>
	</body>
</html>`
}
