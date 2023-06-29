import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";

import getListings from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Home() {

  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if(listings.length == 0){
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {
            listings.map((item) => {
              return (
                <ListingCard
                  key={item.id}
                  data={item}
                  currentUser={currentUser}
                />
              )
            })
          }
        </div>
      </Container>
    </ClientOnly>
  )
}
