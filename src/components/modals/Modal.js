"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

function Modal({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	SecondaryActionLabel,
}) {
	//if isOpen is true showModal becomes true and vice versa
	const [showModal, setShowModal] = useState(isOpen);
	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className=" flex justify-center items-center fixed inset-0 z-50  bg-neutral-800/70 px-3 md:px-0 overflow-y-auto">
				<div
					className=" relative w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5 my-6 mx-auto h-auto rounded-md overflow-y-auto "
				>
					{/* content */}
					<div
						className={`translate duration-300 h-full ${
							showModal ? " translate-y-0" : " translate-y-full"
						}
                        
                        ${showModal ? " opacity-100" : " opacity-0"} `}
					>
						<div className=" translate h-auto relative flex flex-col w-full bg-white p-5 rounded-md">
							{/* Header col flex */}
							<div className=" flex items-center justify-center p-6 ">
								<button
									className=" p-1 border-0 absolute left-9"
									onClick={handleClose}
								>
									<IoMdClose size={18} />
								</button>
								<div className=" text-lg font-bold">{title}</div>
							</div>
							{/* next child for flex col */}
							<div className=" relative flex-auto mb-9">{body}</div>
							{/* footer */}
							<div className=" flex flex-col ">
								<div className=" flex flex-row items-center gap-4">
									{secondaryAction && SecondaryActionLabel && (
										<Button
											label={SecondaryActionLabel}
											disabled={disabled}
											onClick={handleSecondaryAction}
											bg
										/>
									)}
									<Button
										label={actionLabel}
										disabled={disabled}
										onClick={handleSubmit}
									/>
								</div>
							</div>
							{/* footer */}
							<div>{footer}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Modal;
