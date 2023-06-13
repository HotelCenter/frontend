import { deleteHotel, updateHotel } from "@/actions/hotelActions"
import { getHotels } from "@/lib"
import { Textarea, Modal, Label, Button, Spinner, TextInput } from "flowbite-react"
import { Dispatch, SetStateAction, TransitionStartFunction } from "react"
type AdminModalProps = {
    props: {
        openModal: string | undefined,
        setOpenModal: Dispatch<SetStateAction<string | undefined>>,
        hotel: HotelDataType,

        setSelectedHotel: Dispatch<SetStateAction<HotelDataType>>
    }, setHotels: Dispatch<SetStateAction<HotelDataType[]>>,
    startTransition: TransitionStartFunction,
    isPending: boolean
}

export default function UpdateHotelModal({ props, isPending, startTransition, setHotels }: AdminModalProps) {
    return <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Updating Hotel with ID {props.hotel.id} </Modal.Header>
        <Modal.Body>

            <form action={async (data: FormData) => {
                try {
                    const updatedHotel = await updateHotel(data);
                    props.setSelectedHotel(updatedHotel.data)
                    startTransition(async () => setHotels(await getHotels()));
                } catch (err: any) {
                    throw Error(err)
                }
            }}>
                <input readOnly name='hotelSlug' type='text' hidden value={props.hotel.slug} />

                <div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <TextInput placeholder={props.hotel.address} id="address" name="address" type="text" />
                    </div>

                    <div>
                        <label htmlFor="city">City</label>
                        <TextInput placeholder={props.hotel.city} id="city" name="city" type="text" />
                    </div>

                    <div>
                        <label htmlFor="postcode">Postcode</label>
                        <TextInput placeholder={props.hotel.postcode} id="postcode" name="postcode" type="text" />
                    </div>

                    <div>
                        <label htmlFor="country">Country</label>
                        <TextInput placeholder={props.hotel.country} id="country" name="country" type="text" />
                    </div>

                    <div>
                        <label htmlFor="phone_number">Phone Number</label>
                        <TextInput placeholder={props.hotel.phone_number} id="phone_number" name="phone_number" type="text" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Textarea rows={4} placeholder={props.hotel.description} id="description" name="description" />
                    </div>


                    <div>
                        <label htmlFor="image">Image</label>
                        <TextInput id="image" name="image" type="file" />
                    </div>

                    <div>
                        <label htmlFor="rating">Rating: {props.hotel.rating}</label>
                        <TextInput id="rating" name="rating" type="text" />
                    </div>
                </div>
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
    </Modal >
}