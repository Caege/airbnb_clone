import getListingById from '@/app/actions/getListingById'
import React from 'react'
import EmptyState from '@/components/EmptyState';
import Container from '@/components/Container';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservation from '@/app/actions/getReservations';
export default async function ListingPage ({params}) {
  const listing = await getListingById(params);
const currentUser  = await getCurrentUser();
const reservations = await getReservation(params)

  if (!listing) {
		return (
		
				<EmptyState />
		
		);
	}

  return (
   
      <ListingClient listing = {listing} currentUser = {currentUser} reservation={reservations}/>
   
  )
}

