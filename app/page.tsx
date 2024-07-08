import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Image
          src="/bg_03.png" // ロゴ画像のパスを指定
          alt="Logo"
          layout="responsive"
          width={100} // 100%幅で表示
          height={40} // アスペクト比を維持
          objectFit="contain" // 画像のフィットを調整
        />
    </main>
  );
}
