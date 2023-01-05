import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nNamespace } from '@hooks/useTypesafeI18n';
import { useI18nContext } from '@i18n/i18n-react';
import {
	loginFormSchema,
	TLoginFormFields,
	TLoginFormValidation,
} from '@schemas/pages/auth/login.schema';
import { useForm } from 'react-hook-form';

export default function Page() {
	useI18nNamespace('auth_login');
	const { LL } = useI18nContext();
	const LValidation = LL.auth_login.LoginForm.Validation;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginFormFields>({
		resolver: zodResolver(loginFormSchema),
	});

	const onLoginSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<section>
			<article>
				<h3>Enter credentials to Login</h3>

				<form onSubmit={onLoginSubmit}>
					<div>
						<label htmlFor="login-email">
							{LL.auth_login.Email.Label()}
							<input {...register('email')} id="login-email" />
						</label>
						{errors.email?.message && (
							<p style={{ color: 'red' }}>
								{LValidation.Email[
									errors.email.message as keyof TLoginFormValidation['Email']
								]()}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="login-password">
							{LL.auth_login.Password.Label()}
							<input {...register('password')} id="login-password" />
						</label>
						{errors.password?.message && (
							<p style={{ color: 'red' }}>
								{LValidation.Password[
									errors.password
										.message as keyof TLoginFormValidation['Password']
								]()}
							</p>
						)}
					</div>

					<button type="submit">Login</button>
				</form>
			</article>
		</section>
	);
}
