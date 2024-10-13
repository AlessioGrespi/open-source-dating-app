<script>
	import '../app.css';
</script>

<div class="flex h-screen w-full grow place-items-center justify-center">
	<div class="w-[40rem] p-20">
		<nav class="mb-1 flex w-full justify-between border-b-2 pb-1 text-2xl font-semibold">
			<a class="rounded-xl px-2 py-0.5 hover:bg-neutral-200" href="./login">Login</a>
			<form action='/logout' method='POST'>
				<button class="rounded-xl px-2 py-0.5 hover:bg-neutral-200">Logout</button>
			</form>
			<a class="rounded-xl px-2 py-0.5 hover:bg-neutral-200" href="./protected">Protected Page</a>
		</nav>
		<slot></slot>
	</div>
</div>
