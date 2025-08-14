<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSettings } from "@/utils/platform";
import { getSelectedAddress } from "@/utils/wallet";
import { initializeDefaultNetworks } from "@/utils/simpleNetworkInit"; // NEW: Import network initializer
import type { RequestArguments } from "@/extension/types";

const route = useRoute();
const router = useRouter();
const { param, rid, website } = route.query;

const pageListener = (
  message: RequestArguments,
  sender: any,
  sendResponse: (a: any) => any
) => {
  if (chrome.runtime.lastError) {
    console.info("Error receiving message:", chrome.runtime.lastError);
  }
  if (message?.type === "CLWALLET_PAGE_MSG") {
    console.info("page listener:", message);

    (async () => {
      if (!message?.method) {
        sendResponse({
          code: 500,
          message: "Invalid request method",
        });
      } else {
        // ETH API
        switch (message.method) {
          case "paste": {
            const currentAddress = (await getSelectedAddress()) as string[];
            if (currentAddress.length > 0) {
              document.execCommand("insertText", false, currentAddress[0]);
            }
            sendResponse(true);
            break;
          }
          default: {
            sendResponse({
              error: true,
              message:
                "MagicCraft: Invalid PAGE request method " + (message?.method ?? ""),
            });
            break;
          }
        }
      }
    })();
  }
  return true;
};

if (chrome?.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener(pageListener);
  console.info("page listener set");
}

onBeforeMount(async () => {
  // NEW: Initialize default networks on app start
  try {
    await initializeDefaultNetworks();
    console.log("Default networks initialized");
  } catch (error) {
    console.error("Failed to initialize networks:", error);
  }

  getSettings().then((settings) => {
    if (settings.theme !== "system") {
      document.body.classList.remove(settings.theme === "dark" ? "light" : "dark");
      document.body.classList.add(settings.theme);
    }
  });
});

onMounted(() => {
  switch (route?.query?.route ?? "") {
    case "sign-msg": {
      router.push({
        path: `/sign-msg/${rid}/${param}/${website}`,
      });
      break;
    }
    case "sign-tx": {
      router.push({
        path: `/sign-tx/${rid}/${param}/${website}`,
      });
      break;
    }
    case "switch-network": {
      router.push({
        path: `/switch-network/${rid}/${param}/${website}`,
      });
      break;
    }
    case "request-network": {
      router.push({
        path: `/request-network/${rid}/${param}/${website}`,
      });
      break;
    }
    case "wallet-error": {
      router.push({
        path: `/wallet-error/${rid}/${param}/${website}`,
      });
      break;
    }
    default: {
      router.push({ path: "/" });
    }
  }
});
</script>