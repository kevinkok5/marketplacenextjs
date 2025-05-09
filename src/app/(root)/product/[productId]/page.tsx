export const dynamic = "force-dynamic";

import Products from "@/features/product/components/Products";

const Page = async (props: { params: Promise<{ productId: string }> }) => {
    const params = await props.params;
    const { productId } = params;

    return <Products productId={productId} />;
};

export default Page;
