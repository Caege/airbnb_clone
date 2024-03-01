'use client'
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";
function UserMenu({currentUser}) {
	const router = useRouter()
		const rentModal = useRentModal();
	const [isOpen, setOpen] = useState(false);
	const RegisterModal = useRegisterModal();
	const loginModal = useLoginModal()

	const toggleOpen = useCallback(() => {
		 setOpen((prev) => !prev);
	},[]);

	const onRent = useCallback(() => {
		if(!currentUser) {
			return loginModal.onOpen()
		}

	
		rentModal.onOpen();
	}, [loginModal, currentUser, rentModal])
	
	return (
		<div className=" relative">
			<div className=" flex flex-row gap-3 items-center">
				<div
					className=" rounded-full py-3 px-4 hover:border hover:cursor-pointer hidden  md:block text-sm transition font-semibold"
					onClick={onRent}
				>
					Airbnb your home
				</div>
				<div
					className=" rounded-full border flex flex-row items-center gap-4 p-4 cursor-pointer md:py-1
          md:px-2"
					onClick={toggleOpen}
				>
					<AiOutlineMenu />

					<div className=" hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className=" absolute md:w-3/4 right-0 top-12 bg-white rounded-md p-3 shadow-md  z-50 w-[40vw] text-sm">
					<div className=" flex flex-col  relative ">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => {
										router.push("/trips");
										setOpen(false)
									}}
									label="My trips"
								/>
								<MenuItem
									onClick={() => {
										router.push("/favorites");
										setOpen(false);
									}}
									label="My favorites"
								/>
								<MenuItem
									onClick={() => {
										router.push("/reservations");
										setOpen(false);
									}}
									label="My reservations"
								/>
								<MenuItem
									onClick={() => {
										router.push("/properties");
										setOpen(false);
									}}
									label="My properties"
								/>
								<MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
								<hr />
								<MenuItem
									onClick={() => {
										signOut();
									}}
									label="Log out"
								/>
							</>
						) : (
							<>
								<MenuItem onClick={() => {
									loginModal.onOpen();
									setOpen(false)
								}} label="Login" />
								<MenuItem onClick={() => {
									RegisterModal.onOpen();
									setOpen(false)
								}} label="Sign up" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default UserMenu;
