import React from "react";

const TopQuote = () => {
  return (
    <blockquote>
      <p
        className="text-center p-4 mt-5 font-weight-lighter"
        style={{
          fontSize: 45,
          fontWeight: "bolder",
          // backgroundColor: "rgba(20,20,20,0.9)",
          color: "white",
          position: "relative"
        }}
      ></p>
    </blockquote>
  );
};

const BotQuote = () => {
  return (
    <blockquote>

      <br /> <br />
      <p
        className="text-center p-5 mt-5 font-weight-lighter"
        style={{ fontSize: 20 }}
      >
        বার কাউন্সিলের পরীক্ষা, আইনী শিক্ষা কিংবা সাধারণ একজন করদাতার বার্ষিক
        আয়কর রিটার্ন বা বাড়ি ভাড়া, পার্টনারশিপ ও অন্যান্য চুক্তির মতো নিত্যদিনের
        সাধারণ অথচ প্রয়োজনীয় কাজগুলি সম্পাদনের জন্য কারো হাজার হাজার টাকা খরচের
        ভার বহন করা উচিত বলে আমরা বিশ্বাস করি না। তাই সবার জন্য অতি প্রয়োজনীয়
        আইন সেবাগুলো সহজলভ্য করে তোলার জন্য আমরা একটি সামাজিক আন্দোলন শুরু
        করেছি। ওয়েব সাইটটি সেই প্রয়াসেরই একটি অংশ।
      </p>
    </blockquote>
  );
};

export { TopQuote, BotQuote };
