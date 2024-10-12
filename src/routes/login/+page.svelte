<div class="flex w-full h-screen justify-center content-center">
	<div class="bg-indigo-100 flex w-fit h-fit p-5 rounded-lg shadow-lg my-auto">
		<form class="flex flex-col justify-center" action="?/login" method="POST">
			<div class="w-full flex justify-between p-1 pb-3 ">
				<label class="font-semibold text-indigo-900 text-xl" for="email">Email</label>
				<input class="ml-5 w-52 rounded " name="email" type="email" />
			</div>
			<div class="w-full flex justify-between p-1">
				<label class="font-semibold text-indigo-900 text-xl" for="password">Password</label>
				<input class="ml-5 w-52 rounded " name="password" type="password" />
			</div>
			<button class="bg-indigo-600 text-white rounded-full py-0.5 w-full mx-auto mt-4" type="submit">Log In</button>
			<p class="text-center my-2.5">or</p>
			<a class="bg-indigo-600 text-white rounded-full py-0.5 w-full mx-auto text-center" href="./signup">Sign Up</a>
		</form>
	</div>
</div>
