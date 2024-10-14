<div class="flex w-full justify-center">
	<div class="w-fit">
		<form class="flex flex-col justify-center" action="?/login" method="POST">
			<div class="flex w-full justify-between p-1">
				<label class="text-xl font-semibold" for="email">Email</label>
				<input class="ml-5 w-52 rounded border-2 border-black px-1" name="email" type="email" />
			</div>
			<div class="flex w-full justify-between p-1">
				<label class="text-xl font-semibold" for="password">Password</label>
				<input class="ml-5 w-52 rounded border-2 border-black px-1" name="password" type="password" />
			</div>
			<button class=" mx-auto mt-4 w-28 rounded-full py-0.5 text-white font-semibold bg-neutral-700 hover:bg-black" type="submit"
				>Log In</button
			>
			<p class="my-1 text-center">or</p>
			<a class=" mx-auto w-28 rounded-full py-0.5 text-center text-white font-semibold bg-neutral-700 hover:bg-black" href="./signup"
				>Sign Up</a
			>
		</form>
	</div>
</div>
