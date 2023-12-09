"use client";
import React, { useState } from "react";
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
import { signIn } from "next-auth/react"
function RegisterModal() {
	
	const RegisterModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				RegisterModal.onClose();
			})
			.catch((e) => {
				toast.error("something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className=" flex flex-col gap-4">
			<Heading title={"Welcome to Airbnb"} subtitle={"Create an account"} />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
			/>
			<Input
				id="name"
				label="Name"
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

	const footerContent = (
		<div className=" flex flex-col gap-4 mt-4">
			<hr />
			<Button
				Icon={FcGoogle}
				label={"Continue with Google"}
				bg={true}
				onClick={() => signIn("google")}
			/>
			<Button
				Icon={AiFillGithub}
				label={"Continue with Github"}
				bg
				onClick={() => signIn("github", {callbackUrl : "/"})}
			/>
			<div className=" text-neutral-500 text-center mt-4 font-light">
				<div className=" flex flex-row items-center gap-2 justify-center">
					<div>Already have an account?</div>
					<div
						className=" text-neutral-800 cursor-pointer hover:underline"
						onClick={RegisterModal.onClose}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={RegisterModal.isOpen}
			title={"Register"}
			actionLabel={"Continue"}
			onClose={RegisterModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}

export default RegisterModal;
