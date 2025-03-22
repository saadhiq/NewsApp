import React from "react";

function EverythingCard(props) {
  // Normalize props.url and props.source
  const url = Array.isArray(props.url) ? props.url[0] : props.url;
  const source = Array.isArray(props.source) ? props.source[0] : props.source;

  return (
    <div className="everything-card mt-10 shadow-lg rounded-lg overflow-hidden border bg-white">
      {/* Main Card Content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title */}
        <b className="title text-lg font-semibold">{props.title}</b>

        {/* Image */}
        <div className="everything-card-img mx-auto">
          <img
            className="w-full h-48 object-cover rounded"
            src={props.imgUrl}
            alt="news"
          />
        </div>

        {/* Description */}
        <div className="description">
          <p className="description-text leading-6 text-gray-700">
            {props.description?.substring(0, 200)}
          </p>
        </div>

        {/* Info Section */}
        <div className="info compact space-y-2">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words text-blue-600"
            >
              {source?.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col space-y-1 text-sm text-gray-600">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>{" "}
              {props.author || "Unknown"}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>{" "}
              {props.publishedAt}
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Extra Section at the bottom (if needed) */}
      {/* You can remove this part if you don't need the "extra card" style */}

      <div className="flex lg:flex-row mt-5">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${props.imageUrlLeft})` }}
          title={props.imageLeftTitle}
        ></div>
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={props.authorImage}
                alt="Author"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName}</p>
              <p className="text-gray-600">{props.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EverythingCard;
