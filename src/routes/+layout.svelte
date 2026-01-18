<script lang="ts">
    import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#0b1221" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
	<style>
		:root {
			--bg: #0b1221;
			--text: #e5e7eb;
		}
		html, body {
			background: var(--bg);
			color: var(--text);
			margin: 0;
			padding: 0;
			font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
		}
		a { color: inherit }
	</style>
</svelte:head>

{@render children()}
