import React from "react"
import { Card, CardContent } from "../../@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../@/components/ui/carousel"
import useUsers from "../../hooks/useUsers"
import Image from "next/image"
import UserCard from "../card/UserCard"

const UserCarousel = () => {
    const { data: users = [] } = useUsers()
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm overflow-x-auto"
        >
            <CarouselContent className=" gap-3">
                {users.map((user: Record<string, any>) => (
                    <CarouselItem key={user._id} className="">
                        <div className="p-1">
                            <UserCard user={user} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default UserCarousel
