import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from "react-icons/md"
import {AiFillTwitterCircle,AiFillYoutube,AiFillInstagram} from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col justify-between md:flex-row pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href='#'>Phones</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Desktops</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>Tvs</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns & Exchange</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem porro debitis assumenda natus, perspiciatis eaque atque tenetur esse, harum voluptatem nostrum eius in fugit deleniti molestiae laborum illo deserunt omnis! Dolores provident ullam illum nam quas iusto nisi repellat voluptatibus repellendus recusandae. Libero, fugit obcaecati!</p>
            <p>&copy;   {new Date().getFullYear()}  Classic Cuts. All rights reserved.</p>
          </div>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2 ">
                <Link href="#"><MdFacebook size={24}/></Link>
                <Link href="#"><AiFillTwitterCircle size={24}/></Link>
                <Link href="#"><AiFillInstagram size={24}/></Link>
                <Link href="#"><AiFillYoutube size={24}/></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
