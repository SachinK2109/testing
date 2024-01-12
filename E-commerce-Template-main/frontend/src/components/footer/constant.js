import { LogoName } from "../../constant";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

export const footerInfo = {
    title: LogoName,
    description: `${LogoName} is a platform where you can find all your favorite imported candies, chocolates, and snacks. The greatest solution to munchies & the go-to for all your snack cravings. Become a member today.`,
    gmail: { icon: <MailOutlined />, mail: 'sachinkaythamwar@gmail.com' },
    phone: { icon: <PhoneOutlined />, number: '555-555-5555' },
    icons: [{ tooltip: 'follow on Facebook', icon: <FacebookOutlined /> }, { tooltip: 'follow on Twitter', icon: <TwitterOutlined /> }, { tooltip: 'follow on Instagram', icon: <InstagramOutlined /> }]
}

export const footerOther = [{
    title: 'Categories',
    items: ['Beverages',
        'Biscuits',
        'Bakery',
        'Candies and Mints',
        'Cereals and Tarts',
        'Chips and Dips',
        'Chocolates',
        'Sauces and Spreads',
        'Instant Noodles',
        'Sauces and Spreads',
        'Snackstar Exclusive',
        'All Snacks and Beverages',
        'Snack Attack Discount Box',
        'Snack Attack SALE',
        'Healthy',
    ]
},
{
    title: 'Top Brands',
    items: [
        'Cadbury',
        'Doritos',
        'M&M',
        'Nutella',
        'Toblerone',
        'Starbucks',
        'Kit Kat',
        'Samyang',
        'Cheetos',
        'Nesquick',
        'Fritos',
        'Coca Cola',
        'Kellogg\'s'
    ]
},
{
    title: 'Quick Links',
    items: [
        'About Us',
        'Privacy Policy',
        'Terms of Use',
        'Terms of service',
        'Refund policy',
    ]
}
];