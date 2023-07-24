import axios from "axios";

export async function getAllfixeddepositlist(queryParams) {
  try {
    const url = new URL("http://34.143.180.195:8080/fixeddeposits/hist");
    url.search = new URLSearchParams(queryParams).toString();

    const response = await axios.get(url.toString());

    if (response.status === 200) {
      const alldata = response.data;
      return alldata;
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
}
