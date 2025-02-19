import { useQuery } from "@vue/apollo-composable";
import { GET_USER } from "../graphql/user";
import type { User } from "../graphql/generated/graphql";
import { computed, ref } from "vue";

export const useGraphQLUser = () => {
  const initialized = ref(false);
  const { result, loading, error, refetch } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  const user = computed<User | null>(() => result.value?.getUser ?? null);

  const fetchUser = async () => {
    if (!initialized.value) {
      initialized.value = true;
      await refetch();
    }
  };

  return {
    user,
    loading,
    error,
    fetchUser,
    refetch,
  };
};
