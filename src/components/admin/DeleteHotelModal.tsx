import { deleteHotel } from "@/actions/hotelActions"
import { getHotels } from "@/lib"
import { Textarea, Modal, Label, Button, Spinner } from "flowbite-react"
import { Dispatch, SetStateAction, TransitionStartFunction } from "react"
type AdminModalProps = {
    props: {
        openModal: string | undefined,
        setOpenModal: Dispatch<SetStateAction<string | undefined>>,
        hotel: HotelDataType,

    }, setHotels: Dispatch<SetStateAction<HotelDataType[]>>,
    startTransition: TransitionStartFunction,
    isPending: boolean
}

export default function DeleteHotelModal({ props, isPending, startTransition, setHotels }: AdminModalProps) {
    return <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Deleting Hotel with ID {props.hotel.id} </Modal.Header>
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
                <input readOnly name='hotelSlug' type='text' hidden value={props.hotel.slug} />
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