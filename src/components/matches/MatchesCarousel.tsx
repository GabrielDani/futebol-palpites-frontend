import React from "react";
import Slider from "react-slick";
import { Clock10 } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CarouselItem = {
  id: string | number;
  [key: string]: unknown;
};

type MatchesCarouselProps<T extends CarouselItem> = {
  items: T[];
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  title?: string;
  titleIcon?: React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  carouselSettings?: object;
  containerClass?: string;
  itemClass?: string;
  emptyStateComponent?: React.ReactNode;
};

const defaultSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  arrows: true,
  draggable: true,
  swipeToSlide: true,
  className: "matches-slider",
};

const defaultLoadingComponent = (
  <div className="flex justify-center items-center py-12">
    <span className="text-yellow-400 text-lg animate-pulse">
      Carregando itens...
    </span>
  </div>
);

const defaultEmptyStateComponent = (
  <div className="text-center py-12 text-gray-400">
    Nenhum item disponível no momento
  </div>
);

export function MatchesCarousel<T extends CarouselItem>({
  items = [],
  loading = false,
  loadingComponent = defaultLoadingComponent,
  title = "Próximos Jogos",
  titleIcon = <Clock10 className="text-yellow-400" size={22} />,
  renderItem,
  carouselSettings = {},
  containerClass = "",
  itemClass = "px-2 sm:px-4",
  emptyStateComponent = defaultEmptyStateComponent,
}: MatchesCarouselProps<T>) {
  const settings = { ...defaultSettings, ...carouselSettings };

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!items.length) {
    return <>{emptyStateComponent}</>;
  }

  return (
    <section
      className={`px-4 sm:px-6 py-8 max-w-7xl mx-auto w-full overflow-visible ${containerClass}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6">
          {titleIcon}
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
      )}

      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={`${itemClass} py-1 relative`}>
            {renderItem(item)}
          </div>
        ))}
      </Slider>
    </section>
  );
}
