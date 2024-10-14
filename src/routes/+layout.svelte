<script>
	import { House } from 'lucide-svelte';
	import '../app.css';
</script>

<div class="flex h-screen w-full grow place-items-center justify-center">
	<div class="w-[50rem] p-20">
		<nav class="mb-1 flex w-full justify-between border-b-2 pb-1 text-2xl font-semibold">
			<a class="rounded-xl px-1 py-0.5 hover:bg-neutral-200" href='/'><House class='h-7 w-7'/></a>
			<a class="rounded-xl px-2 py-0.5 hover:bg-neutral-200" href="./signup">SignUp</a>
			<a class="rounded-xl px-2 py-0.5 hover:bg-neutral-200" href="./login">Login</a>
			<form action='/logout' method='POST'>
				<button class="rounded-xl px-2 py-0.5 hover:bg-neutral-200">Logout</button>
			</form>
			<a class="rounded-xl px-2 py-0.5 hover:bg-neutral-200" href="./protected">Protected Page</a>
		</nav>
		<div class='h-[20rem]'>
			<slot></slot>
		</div>
	</div>
</div>
