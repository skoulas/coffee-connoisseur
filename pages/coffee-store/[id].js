import { useRouter } from "next/router";
import Link from "next/link";
import CoffeeStoreData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      CoffeeStore: CoffeeStoreData.find((CoffeeStore) => {
        return CoffeeStore.id === 0; //dynamic id
      }),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
  };
}

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">
        <a>Back to home </a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
