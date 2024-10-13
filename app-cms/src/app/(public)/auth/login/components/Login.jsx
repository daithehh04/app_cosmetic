"use client";
import { usePostLoginMutation } from "@/stores/slices/api/auth.slices.api";
import { Button, Image, Input } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import _ from "lodash";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postLogin] = usePostLoginMutation();
  const dataLogin = {
    name: "admin",
    password: "12345678",
  };
  const onSubmit = async (data) => {
    if (_.isEqual(dataLogin, data)) {
      toast.success("Đăng nhập thành công");
      Cookies.set("login", "true", { expires: 7 }); //
      const previousPage = router.query?.redirect || "/";
      router.push(previousPage);
    } else {
      toast.error("Tài khoản và mật khẩu không chính xác");
    }
  };

  return (
    // <Loading />
    <div className="flex items-center justify-center w-full h-screen py-10">
      <div className="justify-center hidden w-1/2 h-screen lg:flex">
        <Image
          src="https://res.cloudinary.com/dtnl8o21p/image/upload/v1728784760/toa-heftiba-GLl6_-L3fxM-unsplash_lqjx45.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-screen py-5"
        />
      </div>
      <div className="flex items-center justify-center w-full p-8 lg:p-12 md:p-52 sm:20 lg:w-1/2">
        <div className="bg-white w-[80%] p-6 shadow-lg shadow-cyan-500/50 rounded-lg">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-lg"
              src="https://res.cloudinary.com/dtnl8o21p/image/upload/v1728753121/7e821551447807fbfcc9cdad8e535ae7_njsjw0.png"
              width={40}
              height={40}
              alt="logo"
            />
          </div>
          <h2
            className={clsx(
              "mb-6 text-4xl font-extrabold text-[#292929] text-center my-3",
              "logo"
            )}
          >
            Skin care
          </h2>
          <h3 className="mb-6 text-4xl font-extrabold text-[#292929] text-center my-3 font-semibold">
            Đăng nhập
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: "name không được rỗng" })}
              isRequired
              key={"name"}
              type="name"
              label="Name"
              labelPlacement={"inside"}
              error={errors.name ? true : false}
            />
            {errors.name && (
              <p className="text-[red] p-2">{errors.name.message}</p>
            )}
            <Input
              {...register("password", {
                required: "Mật khẩu không được rỗng",
              })}
              isRequired
              className="mt-4"
              key={"password"}
              type="password"
              label="Mật khẩu"
              labelPlacement={"inside"}
              error={errors.password ? true : false}
            />
            {errors.password && (
              <p className="text-[red] p-2">{errors.password.message}</p>
            )}

            <Button
              size="lg"
              type="submit"
              className="block mx-auto mt-6"
              color="danger"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
