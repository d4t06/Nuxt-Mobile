const tabs = ["All", "Result"] as const;

type Tab = (typeof tabs)[number];

export default function useDashboardProduct() {
  const products = ref<Product[]>([]);

  const value = ref("");
  const isFetching = ref(true);
  const currentTab = ref<Tab>("All");

  const handleSubmit = async () => {
    try {
      isFetching.value = true;

      currentTab.value = "Result";
    } catch (err) {
      console.log({ message: err });
    } finally {
      isFetching.value = false;
    }
  };

  const handleGetSong = async () => {};

  watchEffect(() => {
    if (currentTab.value !== "All") return;

    handleGetSong();
  });

  return {
    isFetching,
    value,
    handleSubmit,
    tabs,
    products,
    currentTab
  };
}
