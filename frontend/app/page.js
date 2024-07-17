'use client'
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header.js/Header";
import Featured from "@/components/featured/Featured";
import PropertyList from "@/components/propertyList/propertyList";
import GuestLoves from "@/components/guestLoves/GuestLoves";
import MailSection from "@/components/mailSection/MailSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (

          <div>    
          <Header/>
          <Featured/>
          <PropertyList/>
          <GuestLoves/>
          <MailSection/>
          <Footer/>
        </div>




  );
}
