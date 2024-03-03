import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE } from "../index";
import service from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PostForm = ({ post }) => {
  console.log(post);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const userData = user.userData;
  console.log(userData);
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    console.log("submitting...");
    if (post) {
      const file = data.image[0]
        ? await service.createFile(data.image[0])
        : null;
      if (file) {
        service.deleteFile(post.featuredImg);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImg: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.createFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImg = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);
  useEffect(() => {
    const subs = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subs.unsubscribe();
  }, [watch, setValue, slugTransform]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImg)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
