"use client";
import React from "react";

import Container from "../Container";
import Logo from "./Logo";
import Search from "../Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
function Navbar({ currentUser }) {
	
	return (
		<div className=" w-full fixed border-b-2 z-10 bg-white target-nav">
			<div className=" sm:py-5 py-2 pb-3 mx-auto   max-w-[1500px] z-10">
				<Container>
					<div className="flex flex-row justify-between items-center gap-3 ">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Container>
				<Categories />
			</Container>
		</div>
	);
}

export default Navbar;
