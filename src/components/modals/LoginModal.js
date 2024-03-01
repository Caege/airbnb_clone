"use client";
import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function LoginModal() {
	const router = useRouter();
	const RegisterModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data) => {
		console.log(data, "this is the data in login modal")
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			console.log("successfully sent to credentials");
			setIsLoading(false);
			if (callback?.ok) {
				toast.success("logged in");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				console.log(callback.error);
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className=" flex flex-col gap-4">
			<Heading title={"Welcome back"} subtitle={"Login to your account"} />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
			/>

			<Input
				id="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
				type="password"
			/>
		</div>
	);

	const toggle = useCallback(() => {
		loginModal.onClose();
		RegisterModal.onOpen();
	});
	
	const footerContent = (
		<div className=" flex flex-col gap-4 mt-4">
			<hr />
			<Button
				Icon={FcGoogle}
				label={"Continue with Google"}
				bg
				onClick={() => signIn("google")}
			/>
			<Button
				Icon={AiFillGithub}
				label={"Continue with Github"}
				bg
				onClick={() => signIn("github")}
			/>
			<div className=" text-neutral-500 text-center mt-4 font-light">
				<div className=" flex flex-row items-center gap-2 justify-center">
					<div>First time using Airbnb?</div>
					<div
						className=" text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title={"Login"}
			actionLabel={"Continue"}
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}

export default LoginModal;
