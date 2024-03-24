import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
const UploadFile = ({ photos, setPhotos }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };
  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhotos = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragPhoto}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <div
              className="photos"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {photos.length < 1 && (
                <>
                  <input
                    id="image"
                    type="file"
                    name="photos"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}

              {photos.length >= 1 && (
                <>
                  {photos.map((photo, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="photo"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img src={URL.createObjectURL(photo)} alt="place" />
                            <button
                              type="button"
                              onClick={() => handleRemovePhotos(index)}
                            >
                              <BiTrash />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="together">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default UploadFile;
