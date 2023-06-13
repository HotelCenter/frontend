'use client';
import HotelCard from '@/components/HotelCard';
import DeleteHotelModal from '@/components/admin/DeleteHotelModal';
import UpdateHotelModal from '@/components/admin/UpdateHotelModal';
import { getHotels } from '@/lib';
import { faEdit, faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initDropdowns } from 'flowbite'
import { Accordion, Button, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { useEffect, useState, useTransition } from 'react';
const customColorTheme: CustomFlowbiteTheme = {
    button: {
        color: {
            red: 'bg-red-200 hover:bg-red-600 '
        }
    }
}

export default function Page() {
    const [hotels, setHotels] = useState<HotelDataType[]>([])
    const [isPending, startTransition] = useTransition()
    const [openDeleteModal, setOpenDeleteModal] = useState<string | undefined>();
    const [openUpdateModal, setOpenUpdateModal] = useState<string | undefined>();
    const [selectedHotel, setSelectedHotel] = useState<HotelDataType>(null!)

    const propsDelete = { openModal: openDeleteModal, setOpenModal: setOpenDeleteModal, selectedHotel, setSelectedHotel };
    const propsUpdate = { openModal: openUpdateModal, setOpenModal: setOpenUpdateModal, selectedHotel, setSelectedHotel };
    useEffect(() => {

        initDropdowns()
        startTransition(async () => setHotels(await getHotels()))
    }, [])

    return (
        <div className='w-full p-4 md:p-0 md:w-6/12   md:mx-auto'>
            <h1 className='text-xl font-bold my-2'>Hotels:</h1>
            {isPending && <span className="loading loading-spinner loading-lg"></span>}
            <Flowbite theme={{ theme: customColorTheme }}>
                <Accordion collapseAll >

                    {

                        hotels.map((hotel, i) => (

                            <Accordion.Panel key={i}>
                                <Accordion.Title>
                                    <div>
                                        {hotel.name}
                                    </div>
                                    <div className='flex p-2 space-x-2'>
                                        <Button color={'warning'} onClick={() => {
                                            propsUpdate.setSelectedHotel(hotel)
                                            propsUpdate.setOpenModal('dismissible')
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} />  Update
                                        </Button>
                                        <Button color={'red'} onClick={() => {
                                            propsDelete.setSelectedHotel(hotel)
                                            propsDelete.setOpenModal('dismissible')
                                        }}>
                                            <FontAwesomeIcon icon={faHotel} />- Delete
                                        </Button>
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content>
                                    <HotelCard hotel={hotel} >
                                        <span></span>
                                    </HotelCard>


                                </Accordion.Content>
                            </Accordion.Panel>

                        ))
                    }
                </Accordion>
                {selectedHotel &&
                    <>
                        <DeleteHotelModal setHotels={setHotels} isPending={isPending} startTransition={startTransition} props={{
                            ...propsDelete,
                            hotel: selectedHotel,
                        }} />
                        <UpdateHotelModal setHotels={setHotels} isPending={isPending} startTransition={startTransition} props={{
                            ...propsUpdate,
                            hotel: selectedHotel,
                        }} />
                    </>
                }

            </Flowbite>


        </div>
    )
}


