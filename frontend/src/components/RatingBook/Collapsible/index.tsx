import { useEffect, useState, type FormEvent } from "react";
import Collapsible from "../../Collapsible";
import RatingBookReview from "../Review";
import type { ReviewProps } from "../../../types/review";
import Typography from "../../Typography";
import Card from "../../Card";
import type { Rating } from "../../../types/common";
import RatingBookForm from "../Form";
import type { RatedCriterionProps } from "../../../types/ratingCriteria";
import { useAuth } from "../../../hooks/useAuth";
import type { BookProps } from "../../../types/book";
import { useBooks } from "../../../hooks/useBooks";
import type { UserProps } from "../../../types/user";

interface RatingBookCollapsibleProps {
  book: BookProps;
}

export interface FormDataProps {
  id: string;
  user: UserProps | undefined;
  book: BookProps | undefined;
  rating: Rating | undefined;
  body?: string;
  createdAt: Date | undefined;
  spoiler: boolean;
  startDate: { day: string; month: string; year: string };
  endDate: { day: string; month: string; year: string };
  mostRecentReading: boolean;
  ratingCompositionCriteria: RatedCriterionProps[];
  independentRatingCriteria: RatedCriterionProps[];
  useCompositionCriteria: boolean;
  useIndependentCriteria: boolean;
}

const initialState = {
  id: "",
  user: undefined,
  book: undefined,
  rating: undefined,
  body: "",
  createdAt: undefined,
  spoiler: false,
  startDate: { day: "", month: "", year: "" },
  endDate: { day: "", month: "", year: "" },
  mostRecentReading: true,
  ratingCompositionCriteria: [],
  independentRatingCriteria: [],
  useCompositionCriteria: false,
  useIndependentCriteria: false,
};

const RatingBookCollapsible = ({ book }: RatingBookCollapsibleProps) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>(initialState);
  const { getUserBookReviews } = useBooks();
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    setReviews(getUserBookReviews(book.id, currentUser.id) ?? []);


  }, [getUserBookReviews, currentUser, book]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { useCompositionCriteria, useIndependentCriteria, ...review } =
      formData;

    const newReview: ReviewProps = {
      ...review,
      id: isUpdating ? review.id : `criterion-${Date.now()}`,
      user: currentUser!,
      book: book,
      createdAt: new Date(),
      mostRecentReading: true,
    };

    if (isUpdating) {
      setReviews((prev) =>
        prev.map((r) => (r.id === newReview.id ? newReview : r))
      );
    } else {
      setReviews((prev) => [
        ...prev.map((r) => ({ ...r, mostRecentReading: false })),
        newReview,
      ]);
    }

    setFormData(initialState);
    setFormIsOpen(false);
  };

  const mapReviewToFormData = (review: ReviewProps): FormDataProps => {
    return {
      id: review.id,
      user: review.user,
      book: review.book,
      rating: review.rating ?? undefined,
      body: review.body,
      createdAt: review.createdAt,
      spoiler: review.spoiler ?? false,
      startDate: {
        day: review.startDate?.day ?? "",
        month: review.startDate?.month ?? "",
        year: review.startDate?.year ?? "",
      },
      endDate: {
        day: review.endDate?.day ?? "",
        month: review.endDate?.month ?? "",
        year: review.endDate?.year ?? "",
      },
      mostRecentReading: review.mostRecentReading ?? false,
      ratingCompositionCriteria: review.ratingCompositionCriteria ?? [],
      independentRatingCriteria: review.independentRatingCriteria ?? [],
      useCompositionCriteria:
        (review.ratingCompositionCriteria?.length ?? 0) > 0,
      useIndependentCriteria:
        (review.independentRatingCriteria?.length ?? 0) > 0,
    };
  };

  const handleUpdate = (idReview: string) => {
    const review = reviews.find((r) => r.id === idReview);
    if (!review) return;

    setFormData(mapReviewToFormData(review));
    setFormIsOpen(true);
    setIsUpdating(true);
  };

  const onDelete = (idReview: string) => {
    setReviews(reviews.filter((r) => r.id !== idReview));
  };

  const handleCancel = () => {
    setFormIsOpen(false);
    setFormData(initialState);
  };

  return (
    <>
      <RatingBookForm
        formData={formData}
        setFormData={setFormData}
        isOpen={formIsOpen}
        handleCancel={handleCancel}
        onSubmit={onSubmit}
      />
      <Collapsible
        hasButton={true}
        nameButton="Cadastrar nova leitura"
        title="Leituras"
        variantTitle="h2"
        onClick={() => setFormIsOpen(true)}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <RatingBookReview
              handleUpdate={handleUpdate}
              onDelete={onDelete}
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <Card width="full">
            <Typography variant="h3" marginBottom="none">
              Ainda não existem leituras cadastradas para esse livro
            </Typography>
          </Card>
        )}
      </Collapsible>
    </>
  );
};

export default RatingBookCollapsible;
