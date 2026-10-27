
import { createSupabaseServerClient } from "./supabase-server";

export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      supabase,
      user: null,
      isAdmin: false,
    };
  }

  const { data: adminRecord, error: adminError } = await supabase
    .from("autoconnet_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    supabase,
    user,
    isAdmin: !adminError && Boolean(adminRecord),
  };
}
