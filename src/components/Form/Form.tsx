import { useState, useEffect, useMemo } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { clearError, login } from '@/store/slices/user';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Section } from '../Section';
import clsx from '@/utils/clsx';
import { validName } from '@/utils';
import { validPassword } from '@/utils/validPasword';
import { Loader } from '../UI';

import styles from './form.module.css';
import { useBtnWatch } from '@/hooks/useBtnWatch';



interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> { }

export const Form: React.FC<FormProps> = ({ className, ...otherProps }) => {

  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isPressed, btnsHelp] = useBtnWatch()

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null)



  const isInvalid = useMemo(
    () => Boolean(validName(name) || validPassword(password) || error),
    [name, password, error],
  );

  useEffect(() => {
    if (error) {
      setPasswordError(error)
    }
  }, [loading, error])

  useEffect(() => {
    if (isPressed) {
      if (isInvalid) {
        setNameError(validName(name))
        setPasswordError(validPassword(password))
      } else {
        dispatch(login({ name, password }));
        setSuccess('Пользователь с таким именем уже существует')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPressed])

  const handleSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isInvalid) {
        setNameError(validName(name))
        setPasswordError(validPassword(password))
      } else {
        dispatch(login({ name, password }));
        setSuccess('Пользователь с таким именем уже существует')
      }
    }



  return (
    <Section
      title='Добро пожаловать!'
      className={clsx(styles.section, className)}
    >
      <form onSubmit={handleSubmit} className={styles.form} {...otherProps}>
        <Input
          className={styles.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setNameError(null)
            setSuccess(null)
          }}
          label='Имя'
          id='name'
          tooltip='Имя должно начинаться с заглавной буквы, содержать 2-30 символов, без пробелов'
          minLength={2}
          maxLength={30}
          error={nameError}
          success={success}
          clearBtn
          required
          clearCB={() => {
            dispatch(clearError())
            setNameError(null)
            setName('')
          }}
          disabled={loading}
        />
        <Input
          className={styles.input}
          value={password}
          onChange={(e) => {
            dispatch(clearError())
            setPasswordError(null)
            setPassword(e.target.value)
          }}
          id='password'
          label='Пароль'
          type='password'
          tooltip='Пароль должен содержать 8-30 символов, без пробелов. Минимум 2 цифры и 3 заглавные буквы'
          error={passwordError}
          passwordBtn
          clearBtn
          clearCB={() => {
            dispatch(clearError())
            setPassword('')
          }}
          required
          disabled={loading}
        />
        <Button
          className={styles.submitBtn}
          type='submit'
          tip={btnsHelp}
          disabled={loading || !name.length || !password.length}
        >
          {loading ? <Loader /> : 'Начать'}
        </Button>
      </form>
    </Section>
  );
};
