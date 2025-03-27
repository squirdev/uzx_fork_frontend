export default function TradingVideoItem({ data }) {
  return (
    <div className="w-full rounded-md border border-white p-7">
      <p className="text-white font-bold text-xl">{data.title}</p>
      <video
        autoPlay
        muted
        loop
        controls
        width="640"
        height="360"
        className="lazyload mt-5"
      >
        <source src={data.videoUrl} type="video/mp4" />
      </video>
      <div className="w-full px-8 pt-9">
        <button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full w-full py-2 font-bold text-md">
          {data.text}
        </button>
      </div>
    </div>
  );
}
