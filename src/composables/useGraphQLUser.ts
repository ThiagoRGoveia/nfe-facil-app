import { useQuery } from "@vue/apollo-composable";
import { GetUserQuery } from "../graphql/user";
import type { User } from "../graphql/generated/graphql";
import { computed, ref } from "vue";

export const useGraphQLUser = () => {
  const initialized = ref(false);
  const { result, loading, error, refetch } = useQuery(GetUserQuery, {
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
