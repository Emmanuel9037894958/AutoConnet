const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function resetAdminPassword() {
  const adminUserId = "0f7d8e19-ad93-4fbc-b0fc-b2edd47f9d4d";

  const newPassword = "AutoConnet@2026";

  const { data, error } = await supabase.auth.admin.updateUserById(
    adminUserId,
    {
      password: newPassword,
    }
  );

  if (error) {
    console.error("❌ Password reset failed:");
    console.error(error.message);
    process.exit(1);
  }

  console.log("✅ ADMIN PASSWORD UPDATED SUCCESSFULLY");
  console.log("Email: emmanuelamamchukwu506@gmail.com");
  console.log("Password: " + newPassword);
}

resetAdminPassword();