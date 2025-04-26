import { Button } from "@mui/material";

type User = {
	id: string;
	firstName: string;
	lastName: string;
};

async function getUser(): Promise<User> {
	"use server";
	const res = await fetch("https://example.com/user", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user");
	}

	return res.json();
}

export default async function Home() {
	const user = await getUser();

	return (
		<>
			<Button variant="contained" color="primary">
				Hello {user.firstName} {user.lastName}
			</Button>
		</>
	);
}
