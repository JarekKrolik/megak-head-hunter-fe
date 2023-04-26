import React, {useRef} from "react";
import {Form, Formik, FormikHelpers, useField} from "formik";
import {Input} from "../Input/Input";
import {Button} from "../../common/Button/Button";
import * as Yup from "yup";

interface Values {
    studentsFile: null;

}

interface Props {
    handleModalExit: () => void;
}

const fileTypes = [
    'application/json',
    'text/csv',
]

const maxFilesize = 2097152;



export const AdminViewFormStudentsAdd = (props: Props) => {
    const fileRef = useRef(null)


    return (
        <Formik
            initialValues={{
                studentsFile: null,
            }}
            validationSchema={Yup.object({
                studentsFile: Yup.mixed().required('Musisz dodać plik')
                    .test("fileFormat",
                        "Niewłaściwy typ pliku",
                        () => {
                            const filesReference: any = fileRef.current;
                            const fileToCheck = filesReference.files[0];
                            if(fileToCheck){
                                return fileTypes.includes(fileToCheck.type)
                            }else return true
                        }
                    ).
                    test(
                        "fileSize",
                        "Plik jest zbyt duży",
                        () => {
                            const fileList: any = fileRef.current
                            const singleFile = fileList.files[0];
                            if (singleFile) {
                                return singleFile.size <= maxFilesize
                            } else {
                                return true
                            }
                        }
                    )
            })}

            onSubmit={(
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 500);
            }}
        >
            {formik => (<Form className={'admin-view__form'}>
                <input type="file"
                       id='studentsFile'
                       name='studentsFile'
                       ref={fileRef}
                       multiple={false}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                {formik.touched.studentsFile && formik.errors.studentsFile ? (
                    <div className={'error'}>{formik.errors.studentsFile}</div>
                ) : null}
                {/*<Button endpoint={'#'} text={'wyślij'}/>*/}
                <button type={'submit'} className="btn">wyslij</button>
                <div onClick={props.handleModalExit} className={'btn modal'}>zamknij</div>
            </Form>)}
        </Formik>
    )
}