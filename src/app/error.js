"use client"

import EmptyState from "@/components/EmptyState"

import React, { useEffect } from 'react'

function Error({ error}) {

     useEffect(() => {
				console.error(error);
			}, [error]);
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}

export default Error