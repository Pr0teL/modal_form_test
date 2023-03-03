import React from "react"
import styles from "./ModalForm.module.css"

export function ModalForm({ setModalOpen }) {
    const [validForm, setValidForm] = React.useState(false)
    const [FormData, setFormData] = React.useState({
        name: "",
        name_valid: 'default',
        phone: "",
        phone_valid: 'default',
        text: "",
        text_valid: 'default',
    })

    const [sendData, setSendData] = React.useState({
        name: "",
        phone: "",
        text: "",
    })

    console.log(FormData);
    React.useEffect(() => {
        setValidForm(FormData.name_valid === "success" && FormData.phone_valid === "success" && FormData.text_valid === "success")
        console.log(validForm);
        setSendData({
            name: FormData.name,
            phone: `+${FormData.phone.replace(/\D/g, '')}`,
            text: FormData.text
        })
        console.log(sendData);
    }, [FormData])




    const getFormatPhone = (value) => {
        if (!value) {
            setFormData({ ...FormData, phone: '', phone_valid: "default" })
            return;
          }
        
        const phoneNumber = value.replace(/\D/g, '');
        const formatedPhone = (phoneNumber) => {
          if (phoneNumber.length < 5) return phoneNumber;
          if (phoneNumber.length <= 9) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
          return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
        };
        
        const formattedNumber = formatedPhone(phoneNumber);
        
        if (phoneNumber[0] === '7' && phoneNumber.length === 11) {
          setFormData({ ...FormData, phone: formattedNumber, phone_valid: "success" })
        } else {
          setFormData({ ...FormData, phone: formattedNumber, phone_valid: "err" })
        }
      }

    const checkText = (value, input) => {
        if (input === 'textarea') {
            if (/^[a-zA-Zа-яА-Я0-9/(/)/!@#$%^&*-_/=/+/{/}/|/?<>,.`"'~/[/ №\s]+$/.test(value)) {
                setFormData({ ...FormData, text: value, text_valid: "success" });
            }
            else {
                setFormData({ ...FormData, text: value, text_valid: "err" });
            }
        }
        if (input === 'name') {
            if (/^[a-zA-Zа-яА-Я., ]+$/.test(value)) {
                setFormData({ ...FormData, name: value,  name_valid: "success" });
            }
            else {
                setFormData({ ...FormData, name: value,  name_valid: "err" });
            }
        }
        return value
    }


    return (
        <div onClick={setModalOpen} className={styles.layer_opacity}>
            <form onClick={(e) => {
                e.stopPropagation()
            }} className={styles.form}>
                <div>
                    <p>Name</p>
                    <input value={FormData.name}
                        onChange={e => checkText(e.target.value, 'name')} className={FormData.name_valid === 'err' ?
                            styles.input_err : FormData.name_valid === 'success' ?
                                styles.input_success :
                                styles.input_default} type="text" placeholder={'Ivan Ivanov'} />
                       {FormData.name_valid === 'err' && <p className={styles.p_err}>Error</p>}
                </div>
                
                <div>
                    <p>Phone</p>
                    <input maxLength={18} value={FormData.phone}
                        onChange={e =>  getFormatPhone(e.target.value)} className={FormData.phone_valid === 'err' ?
                        styles.input_err : FormData.phone_valid === 'success' ?
                            styles.input_success :
                            styles.input_default} type="text" />
                    {FormData.phone_valid === 'err' && <p className={styles.p_err}>Error</p>}
                </div>
                <div>
                    <p>Massage</p>
                    <textarea value={FormData.text}
                        onChange={e =>  checkText(e.target.value, 'textarea')} className={FormData.text_valid === 'err' ?
                        styles.input_err : FormData.text_valid === 'success' ?
                            styles.input_success :
                            styles.input_default} style={{ height: "70px" }}></textarea>
                    {FormData.text_valid === 'err' && <p className={styles.p_err}>Error</p>}
                </div>
                <button disabled={!validForm} onClick={() => {
                    alert(`Форма успешно отправлена \n Данные: \n${JSON.stringify(sendData)}`)
                }} className={validForm ? "form_button" : "form_button_disable" }>Send Form</button>
            </form>
        </div>
    )
}