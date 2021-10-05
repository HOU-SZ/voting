import React, { useState, useEffect, useRef } from "react";
import Dragula, { Drake } from "dragula";
import { Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { copy } from "copy-anything";

import "dragula/dist/dragula.css";

import Layout from "./Layout";
import Section from "./Section";
import IdeaCard from "./Idea";
import BoardErrorBoundary from "./BoardErrorBoundary";

import './index.css';


export interface columnProps {
  topicId: string;
  editable: boolean;
  isRemove: boolean;
  columnId: string;
  columnName: string;
  columnIdeas: ideaProps[];
  createdAt: string;
  updatedAt: string;
}
export interface ideaProps {
  ideaId: string;
  description: string;
  userId: string;
  topicId: string;
  columnId: string;
  editable: boolean;
  likeable: boolean;
  likeCount: number;
  haveLiked: haveLikedProps[];
  ideaLikes: ideaLikeProps[];
  createdAt: string;
  updatedAt: string;
  isRemove: boolean;
}

export interface ideaLikeProps {
  likeId: string;
  ideaId: string;
  topicId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isRemove: boolean;
}

export interface haveLikedProps {
  likeId: string;
}

export type KanbanProps = {
  topicId: string;
  columns?: columnProps[];
  layoutDirection?: "vertical" | "horizon";
  topicEditable: boolean;
  onIdeaSave?: () => {};
  onLikeChange?: () => {};
  onIdeaMoved?: (columnId: string, ideaId: string) => void;
  onAddColumn?: (topicId: string, columnName: string) => void;
  onDelColumn?: (columnId: string) => void;
  onUpdateColumnName?: (
    topicId: string,
    columnId: string,
    columnName: string
  ) => void;
  onAddIdea?: (topicId: string, columnId: string, description: string) => void;
  onDelIdea?: (ideaId: string) => void;
  onUpdateIdea?: (ideaId: string, description: string) => void;
  onClickLike?: (columnId: string, topicId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) => void;
  onAddLike?: (columnId: string, topicId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) => void;
  onDelLike?: (topicId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) => void
};

export default function KanBoard(props: KanbanProps) {
  const {
    topicId,
    columns,
    topicEditable,
    onAddColumn,
    onDelColumn,
    onUpdateColumnName,
    onAddIdea,
    onDelIdea,
    onUpdateIdea,
    onIdeaMoved,
    onClickLike,
    onAddLike,
    onDelLike,
  } = props;
  const [dragula] = useState<Drake>(Dragula());
  const [isIdeaMoved, setIdeaMoved] = useState(false);
  const [ideaMovedPosition, setIdeaMovedPosition] = useState({
    ideaId: "",
    newColumnId: "",
    oldColumnId: "",
    siblingIdeaId: "",
  });

  const refs = useRef<HTMLDivElement[]>([]);
  const [ direction, setDirection] = useState('vertical');

  useEffect(() => {
    const containers = refs.current;
    if (Array.isArray(containers)) {
      dragula.containers = containers;
      // console.log(containers);
    }

    // dragula.on("drag", (el, source) => {
    //   console.log((el as HTMLElement));
    //   console.log((el as HTMLElement).dataset);
    //   console.log((source as HTMLElement));
    //   console.log((source as HTMLElement).dataset);
    // });

    dragula.on("drop", (el, target, source, sibling) => {
      // pick ideaid from data-ideaid
      const ideaId = (el as HTMLElement).dataset.ideaid!;
      // console.log((el as HTMLElement).dataset);
      const newColumnId = (target as HTMLElement).dataset.columnid!;
      const oldColumnId = (source as HTMLElement).dataset.columnid!;
      const siblingIdeaId = sibling
        ? (sibling as HTMLElement).dataset.ideaid!
        : "";

      // dragula.cancel(true);
      setIdeaMovedPosition({
        ideaId,
        oldColumnId,
        newColumnId,
        siblingIdeaId,
      });
      setIdeaMoved(true);
    });
    return () => {
      dragula.destroy();
    };
  }, []);

  useEffect(() => {
    const { ideaId, oldColumnId, newColumnId, siblingIdeaId } =
      ideaMovedPosition;
    if (isIdeaMoved) {
      // handleIdeaMoved(columns, ideaId, oldColumnId, newColumnId, siblingIdeaId);
      onIdeaMoved && onIdeaMoved(newColumnId, ideaId);
      console.log(newColumnId, ideaId);
      setIdeaMoved(false);
    }
  }, [isIdeaMoved, ideaMovedPosition, columns]);

  function handleIdeaMoved(
    sections: KanbanProps["columns"],
    ideaId: string,
    oldColumnId: string,
    newColumnId: string,
    siblingIdeaId: string | null
  ) {
    const oldColumnIndex: any = sections!.findIndex(
      (item) => item.columnId === oldColumnId
    );
    const oldIdeaIndex: number = sections![
      oldColumnIndex
    ].columnIdeas.findIndex((item: any) => item.ideaId === ideaId);

    const newColumnIndex: any = sections!.findIndex(
      (item) => item.columnId === newColumnId
    );
    const newIdeaIndex: number = siblingIdeaId
      ? sections![newColumnIndex].columnIdeas.findIndex(
          (item: any) => item.ideaId === siblingIdeaId
        )
      : -1;

    const tempSections = copy(sections!);
    const splicedOne = tempSections[oldColumnIndex].columnIdeas.splice(
      oldIdeaIndex,
      1
    );

    newIdeaIndex > -1
      ? tempSections[newColumnIndex].columnIdeas.splice(
          newIdeaIndex,
          0,
          ...splicedOne
        )
      : tempSections[newColumnIndex].columnIdeas.push(...splicedOne);
  }

  function handleAddColumnButton() {
    onAddColumn && onAddColumn(topicId, "New Column");
  }

  function handleAddIdea(columnId: string) {
    onAddIdea &&
      onAddIdea(topicId, columnId, "let us figure out some new ideas");
  }

  function handleEditTitle(columnId: string, newTitle: string) {
    onUpdateColumnName && onUpdateColumnName(topicId, columnId, newTitle);
  }

  function handleDeleteSection(columnId: string) {
    onDelColumn && onDelColumn(columnId);
  }

  function handleSaveIdea(
    columnId: string,
    ideaId: string,
    newContent: string
  ) {
    // const tempSections = columns?.map((section) => {
    //   if (section.columnId === columnId) {
    //     section.columnIdeas.forEach((item) => {
    //       if (item.ideaId === ideaId) {
    //         item.description = newContent;
    //       }
    //     });
    //     return section;
    //   }
    //   return section;
    // });
    onUpdateIdea && onUpdateIdea(ideaId, newContent);
  }

  function handleDeleteIdea(columnId: string, ideaId: string) {
    // const columnIndex: any = columns!.findIndex(
    //   (item) => item.columnId === columnId
    // );
    // const ideaIndex: number = columns![columnIndex].columnIdeas.findIndex(
    //   (item: any) => item.ideaId === ideaId
    // );

    // const tempSections = copy(columns!);
    // tempSections[columnIndex].columnIdeas.splice(ideaIndex, 1);
    onDelIdea && onDelIdea(ideaId);
  }

  function handleClickLike(columnId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) {
    onClickLike && onClickLike(columnId, topicId, ideaId, likeable, likedIdea)
  }

  function handleAddLike(columnId: string, topicId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) {
    onAddLike && onAddLike(columnId, topicId, ideaId, likeable, likedIdea)
  }

  function handleDelLike(columnId: string, ideaId: string, likeable: boolean, likedIdea: haveLikedProps) {
    onDelLike && onDelLike(topicId, ideaId, likeable, likedIdea)
  }

  function handleDirectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (checked) {
      setDirection('horizon')
    } else {
      setDirection('vertical')
    }
  }

  return (
    <BoardErrorBoundary>
      <div className='container'>
      <div className='align-left'>
        {
          topicEditable ?
          <Button onClick={handleAddColumnButton}>
          <BsPlus />
          Add Column
          </Button>
          :
          <></>
        }
        <br/>
        <br/>
        </div>
      {/* <div className='align-right'><SwitchToggle trueLabel="Horizon" falseLabel="Vertical" toggleSize="xsmall" onChange={handleDirectionChange}/></div> */}
      </div>
      <Layout {...{direction}}>
        {columns?.map((column, i) => (
          <Section
            key={column.columnId}
            title={column.columnName}
            columnId={column.columnId}
            editable={column.editable}
            ref={(ref) => (refs.current![i] = ref!)}
            onAddIdea={handleAddIdea}
            onEditTitle={handleEditTitle}
            onDeleteSection={handleDeleteSection}
          >
            {column.columnIdeas?.map((cardItem, i) => (
              <IdeaCard
                columnId={column.columnId}
                topicId={props.topicId}
                ideaId={cardItem.ideaId}
                key={cardItem.ideaId}
                description={cardItem.description}
                onSaveIdea={handleSaveIdea}
                onDeleteIdea={handleDeleteIdea}
                onClickLike={handleClickLike}
                onAddLike={handleAddLike}
                onDelLike={handleDelLike}
                editable={cardItem.editable}
                likeable={cardItem.likeable}
                haveLiked={cardItem.haveLiked}
                ideaLikes={cardItem.ideaLikes}
                likeCount={cardItem.likeCount}
                {...{dragula}}
              ></IdeaCard>
            ))}
          </Section>
        ))}
      </Layout>
    </BoardErrorBoundary>
  );
}