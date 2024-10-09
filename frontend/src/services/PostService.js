import { api, requestConfig } from "../utils/config";

const publishPost = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/posts", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const PostService = {
  publishPost,
};

export default PostService;
