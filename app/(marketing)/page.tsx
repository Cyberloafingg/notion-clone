import { Button } from "@/components/ui/button";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center 
      md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <div className="bg-red-500 w-full">
          {/* <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">DEBUGGGGGGGGGGGG</h1> */}
        </div>
        <Heroes />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MarketingPage;