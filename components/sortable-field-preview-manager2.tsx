import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { type FieldProps } from "@/components/field";

import { FieldPreviewManager } from "./fieldPreviewManager";
import { FieldPreviewManager2 } from "./fieldPreviewManager2";

export const SortableFieldPreviewManager2 = React.memo(
  ({ formField, form }: FieldProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: formField.name,
    });

    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      transition,
    };

    return (
      <FieldPreviewManager2
        formField={formField}
        form={form}
        ref={setNodeRef}
        style={style}
        isDragging={isDragging}
        {...attributes}
        {...listeners}
      />
    );
  }
);

SortableFieldPreviewManager2.displayName = "SortableField";
