import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    const [sellerVerifyStatus, setSellerVerifyStatus] = useState(null);

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_API_URL}/user/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    console.log('inside seller', data.isSellerVerified);
                    setIsSeller(data.isSeller);
                    setSellerVerifyStatus(data.isSellerVerified);
                    setIsSellerLoading(false)
                })
        }
    }, [email]);
    return [isSeller, isSellerLoading, sellerVerifyStatus];
}

export default useSeller;