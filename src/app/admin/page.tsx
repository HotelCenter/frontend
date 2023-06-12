'use client';

import { deleteHotel } from '@/actions/hotelActions';
import HotelCard from '@/components/HotelCard';
import { fetchData } from '@/utils';
import { faEdit, faHotel, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initDropdowns } from 'flowbite'
import { Accordion, Button, CustomFlowbiteTheme, Dropdown, Flowbite, Label, Modal, Spinner, Textarea } from 'flowbite-react';
import { useEffect, useState, useTransition } from 'react';
const customColorTheme: CustomFlowbiteTheme = {
    button: {
        color: {
            red: 'bg-red-200 hover:bg-red-600 '
        }
    }
}
const getHotels = async () => {
    try {

        const hotels_res = await fetchData(`/api/hotels?page=1&limit=15`)

        return hotels_res.json()
    } catch (err: any) {
        throw Error(err)
    }
}
export default function Page() {
    const [hotels, setHotels] = useState<HotelDataType[]>([])
    const [isPending, startTransition] = useTransition()
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [selectedHotel, setSelectedHotel] = useState<HotelDataType>(null!)

    const props = { openModal, setOpenModal, selectedHotel, setSelectedHotel };
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
                                    {hotel.name}
                                </Accordion.Title>
                                <Accordion.Content>
                                    <HotelCard hotel={hotel} >
                                        <div className='absolute right-0 flex justify-end'>
                                            <Dropdown
                                                label={<FontAwesomeIcon icon={faListDots} />}
                                                color={'white hover:gray'}
                                            >
                                                <div className='p-2 space-y-2'>
                                                    <Button color={'warning'}>
                                                        <FontAwesomeIcon icon={faEdit} />  Update
                                                    </Button>
                                                    <Button color={'red'} onClick={() => {
                                                        props.setSelectedHotel(hotel)
                                                        props.setOpenModal('dismissible')
                                                    }}>
                                                        <FontAwesomeIcon icon={faHotel} />- Delete
                                                    </Button>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </HotelCard>



                                </Accordion.Content>
                            </Accordion.Panel>

                        ))
                    }
                </Accordion>
                {selectedHotel &&

                    <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
                        <Modal.Header>Deleting Hotel with ID {props.selectedHotel.id} </Modal.Header>
                        <Modal.Body>

                            <form action={async (data: FormData) => {
                                try {
                                    await deleteHotel(data)
                                    startTransition(async () => setHotels(await getHotels()))
                                    props.setOpenModal(undefined)

                                } catch (err: any) {
                                    throw Error(err)
                                }
                            }}>
                                <input readOnly name='hotelSlug' type='text' hidden value={props.selectedHotel.slug} />
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="reason"
                                        value="Please leave the reason why deleting this hotel"
                                    />
                                </div>
                                <Textarea
                                    id="reason"
                                    placeholder="Leave the reason..."
                                    required
                                    rows={5}

                                />
                                <Modal.Footer>

                                    <Button disabled={isPending} type='submit' color={'red'} onClick={() => {

                                    }}>
                                        {isPending ? <Spinner></Spinner> : " Confirm"}
                                    </Button>
                                    <Button disabled={isPending} color="gray" onClick={() => {
                                        if (!isPending) {
                                            props.setOpenModal(undefined)
                                        }
                                    }}>
                                        {isPending ? <Spinner></Spinner> : " Cancel"}

                                    </Button>
                                </Modal.Footer>
                            </form>

                        </Modal.Body>
                    </Modal>
                }

            </Flowbite>


        </div>
    )
}


