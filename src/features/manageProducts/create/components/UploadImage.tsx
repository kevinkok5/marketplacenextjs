import Image from "next/image";
import React, { useEffect, useState } from "react";

export type UpoloadFilesErrors = {
    fileLength: string | null;
};

export type file = {
    id?: string;
    media: File | string;
};

type uplaoadInput = {
    files: file[];
    setFiles: React.Dispatch<React.SetStateAction<file[]>>;
    setErrors: React.Dispatch<
        React.SetStateAction<UpoloadFilesErrors | undefined>
    >;
    errors: UpoloadFilesErrors | undefined;
};

const UploadImage = ({ files, setFiles, errors, setErrors }: uplaoadInput) => {
    // const [files, setFiles] = useState();
    const [previews, setPreviews] = useState<string[]>();
    // const [errors, setErrors] = useState<Errors>();
    // let formData = new FormData();

    useEffect(() => {
        if (!files) return;
        let tempFile: string[] = [];
        files.forEach((file) => {
            if (file.media instanceof File) {
                tempFile.push(URL.createObjectURL(file.media));
            } else tempFile.push(file.media);
            // files[i] instanceof File && formData.append('image', files[i]);
        });
        const objectUrls = tempFile;
        setPreviews(objectUrls);
        // console.log(formData.toString());
        // free memory
        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i]);
            };
        }
    }, [files]);

    console.log(files);

    return (
        <div className="left">
            {!previews || previews.length <= 0 ? (
                <>
                    {errors?.fileLength && (
                        <div className="pb-2 text-red-500">
                            {errors.fileLength}
                        </div>
                    )}
                    <div
                        className="border-neutral-600 border rounded-sm sm:aspect-square aspect-video flex flex-col items-center justify-center gap-4 text-[13px]"
                        onClick={() => {
                            const uplaoadInput = document.querySelector(
                                "#uploadImage"
                            ) as HTMLInputElement | null;
                            if (uplaoadInput) uplaoadInput.click();
                        }}
                    >
                        <svg
                            className="!text-white h-[25%] w-[25%]"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="AddToPhotosIcon"
                            fill="currentColor"
                        >
                            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                        </svg>

                        <p>Add photos</p>
                    </div>
                </>
            ) : (
                <>
                    {errors?.fileLength && (
                        <div className="border border-solid border-red-500 p-4 text-red-500">
                            {errors.fileLength}
                        </div>
                    )}
                    <p className="py-3 text-[13px] font-semibold">
                        Photo-{files.length}/10
                    </p>
                    <div className="grid grid-cols-4 gap-2 hide-scrollbar">
                        {previews.map((imageUrl, index) => (
                            <div
                                key={index}
                                className="w-full aspect-square border dark:border-neutral-700"
                            >
                                <Image
                                    src={imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        ))}
                        {files.length < 10 && (
                            <div
                                className="w-full flex flex-col justify-center items-center aspect-square border dark:border-neutral-700"
                                onClick={() => {
                                    const uplaoadInput = document.querySelector(
                                        "#uploadImage"
                                    ) as HTMLInputElement | null;
                                    if (uplaoadInput) uplaoadInput.click();
                                }}
                            >
                                <svg
                                    className="!text-white h-8 w-8"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    data-testid="AddToPhotosIcon"
                                    fill="currentColor"
                                >
                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                                </svg>
                                <small>Add photo</small>
                            </div>
                        )}
                    </div>
                </>
            )}

            <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                name="productImage"
                id="uploadImage"
                className="hidden"
                onChange={(e) => {
                    const selectedFiles = e.target.files;

                    if (!selectedFiles || selectedFiles.length === 0) return;

                    // Check if the number of files exceeds 10
                    setErrors((prev) => ({
                        ...prev,
                        fileLength: null,
                    }));

                    if (
                        selectedFiles.length > 10 ||
                        selectedFiles.length + files.length > 10
                    ) {
                        setErrors((prev) => ({
                            ...prev,
                            fileLength:
                                "You can only upload a maximum of 10 files.",
                        }));
                        // Clear the input to prevent uploading more than 10 files
                        e.target.value = "";
                        return;
                    }

                    // Proceed with file upload
                    console.log(selectedFiles);

                    setFiles((prevFiles) => [
                        ...(prevFiles ?? []), // Ensure prevFiles is an array
                        ...Array.from(selectedFiles).map((file) => ({
                            media: file,
                        })),
                    ]);
                }}
                multiple
            />
        </div>
    );
};

export default UploadImage;
