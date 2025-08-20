<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# PERSONAL-LIBRARY

<em>Organize Your Library Effortlessly</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/JatUppal/Personal-Library?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/JatUppal/Personal-Library?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/JatUppal/Personal-Library?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<br>
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/XML-005FAD.svg?style=flat&logo=XML&logoColor=white" alt="XML">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Roadmap](#roadmap)

---

## Overview

Personal-Library is a full-stack web application that empowers users to organize, search, and enrich their personal book collections with ease. Built with Spring Boot and React, it combines robust backend services with an engaging, modern frontend.

**Why Personal-Library?**

This project aims to streamline personal library management through secure, scalable, and user-friendly features. The core capabilities include:

- 🛡️ **Security & Role Management:** Implements JWT-based authentication and role-based access control for safe user interactions.
- 📚 **External Data Integration:** Imports detailed book information from Google Books to enhance your catalog.
- 🔧 **RESTful API Architecture:** Provides flexible endpoints for managing, searching, and updating library data.
- ⚡ **Modern Frontend:** Utilizes React and Vite for a fast, responsive, and intuitive user interface.
- 💾 **Database & Migration:** Ensures reliable data persistence with PostgreSQL and seamless schema migrations.

---

## Features

|      | Component           | Details                                                                                     |
| :--- | :------------------ | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**     | <ul><li>Spring Boot backend with REST API</li><li>React frontend with Vite</li><li>PostgreSQL database</li></ul> |
| 🔩 | **Code Quality**      | <ul><li>Standard Java coding practices, modular package structure</li><li>React components with hooks, ESLint configured</li></ul> |
| 📄 | **Documentation**     | <ul><li>Docker Compose setup documented in `docker-compose.yml`</li><li>README includes project overview and setup instructions</li></ul> |
| 🔌 | **Integrations**      | <ul><li>JWT for authentication (`jjwt` libraries)</li><li>PostgreSQL database</li><li>Docker for containerization</li><li>NPM packages for React UI</li></ul> |
| 🧩 | **Modularity**        | <ul><li>Separate modules for backend and frontend</li><li>Clear separation of concerns between API, UI, and data layers</li></ul> |
| 🧪 | **Testing**           | <ul><li>Backend tests via Maven (JUnit)</li><li>Frontend tests with React Testing Library and ESLint</li></ul> |
| ⚡️  | **Performance**       | <ul><li>Vite for fast frontend builds</li><li>Minimal dependencies, optimized Docker images</li></ul> |
| 🛡️ | **Security**          | <ul><li>JWT token-based authentication</li><li>Secure API endpoints</li><li>Configuration via `application.yml`</li></ul> |
| 📦 | **Dependencies**      | <ul><li>Java: Spring Boot, JJWT, PostgreSQL driver</li><li>Frontend: React, Vite, Axios, ESLint</li></ul> |

---

## Project Structure

```sh
└── Personal-Library/
    ├── HELP.md
    ├── README.md
    ├── docker-compose.yml
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    ├── src
    │   ├── main
    │   └── test
    └── ui
        ├── .gitignore
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── public
        ├── src
        └── vite.config.js
```

---

### Project Index

<details open>
	<summary><b><code>PERSONAL-LIBRARY/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/HELP.md'>HELP.md</a></b></td>
					<td style='padding: 8px;'>- Provides essential guidance and context for setting up and understanding the project, highlighting its architecture centered around Spring Boot and related technologies<br>- It ensures developers grasp the projects purpose of building a secure, data-driven web application with RESTful services, database migration, and deployment best practices, facilitating effective onboarding and development aligned with the overall system design.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides an overview of the Personal-Library project, emphasizing its role in managing and organizing personal book collections<br>- It highlights how the project facilitates efficient cataloging, searching, and maintaining book data, supporting users in building a personalized library system<br>- The README underscores the applications core purpose within the broader architecture of personal information management tools.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/docker-compose.yml'>docker-compose.yml</a></b></td>
					<td style='padding: 8px;'>- Defines and configures a PostgreSQL database service within the Docker Compose environment, establishing a dedicated container for data storage and management<br>- It ensures persistent data handling, environment setup, and port mapping, supporting the overall architecture by providing a reliable backend database for the personal library application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/pom.xml'>pom.xml</a></b></td>
					<td style='padding: 8px;'>- Defines project dependencies and build configurations for a Spring Boot-based personal library application<br>- Facilitates core functionalities such as user authentication, book management, and data persistence, ensuring seamless integration of security, database migrations, and web services within the overall architecture<br>- Supports rapid development and deployment of a scalable, secure, and maintainable system.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<!-- main Submodule -->
			<details>
				<summary><b>main</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.main</b></code>
					<!-- resources Submodule -->
					<details>
						<summary><b>resources</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.main.resources</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/resources/application.yml'>application.yml</a></b></td>
									<td style='padding: 8px;'>- Defines the applications core configuration, establishing database connectivity, security parameters, and external API integrations<br>- It ensures seamless setup of the data source, Hibernate validation, Flyway migrations, and JWT security, thereby supporting the overall architectures stability, data integrity, and secure access within the personal library management system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- java Submodule -->
					<details>
						<summary><b>java</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.main.java</b></code>
							<!-- com Submodule -->
							<details>
								<summary><b>com</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.main.java.com</b></code>
									<!-- jatin Submodule -->
									<details>
										<summary><b>jatin</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.main.java.com.jatin</b></code>
											<!-- personal_library Submodule -->
											<details>
												<summary><b>personal_library</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.main.java.com.jatin.personal_library</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/PersonalLibraryApplication.java'>PersonalLibraryApplication.java</a></b></td>
															<td style='padding: 8px;'>- Initialize and bootstrap the Spring Boot application for the personal library system, serving as the entry point that launches the entire service<br>- It orchestrates the startup process, enabling the applications components to run seamlessly within the Spring framework, and sets the foundation for managing library data and user interactions within the architecture.</td>
														</tr>
													</table>
													<!-- user Submodule -->
													<details>
														<summary><b>user</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.com.jatin.personal_library.user</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/user/UserRepository.java'>UserRepository.java</a></b></td>
																	<td style='padding: 8px;'>- Provides data access capabilities for user entities within the personal library application, enabling retrieval and management of user information<br>- It supports querying users by email, facilitating authentication and user-specific operations<br>- As part of the data layer, it integrates with the overall architecture to ensure efficient and organized interaction with the underlying database.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/user/Role.java'>Role.java</a></b></td>
																	<td style='padding: 8px;'>- Defines user roles within the application, specifically distinguishing between regular users and administrators<br>- Serves as a foundational component for implementing role-based access control, ensuring appropriate permissions and functionalities are assigned based on user type across the entire system architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/user/User.java'>User.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the User entity within the applications architecture, representing user data and authentication details<br>- Integrates with JPA for database persistence and implements Spring Securitys UserDetails to facilitate authentication and authorization processes<br>- Serves as a core component for managing user information, roles, and security credentials across the system.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- library Submodule -->
													<details>
														<summary><b>library</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.com.jatin.personal_library.library</b></code>
															<!-- service Submodule -->
															<details>
																<summary><b>service</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.library.service</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/service/LibraryService.java'>LibraryService.java</a></b></td>
																			<td style='padding: 8px;'>- Provides core services for managing a users personal library, including listing books, adding new entries manually, and importing books via Google Books integration<br>- Facilitates creation, retrieval, and updating of book and user-book records, ensuring idempotent operations and enriching the library with external data sources<br>- Acts as the central business logic layer for library-related functionalities within the application architecture.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
															<!-- api Submodule -->
															<details>
																<summary><b>api</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.library.api</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/api/LibraryController.java'>LibraryController.java</a></b></td>
																			<td style='padding: 8px;'>- Defines REST API endpoints for managing a users personal library, enabling operations such as listing, adding, updating, importing, retrieving details, and deleting library entries<br>- Integrates user authentication via JWT, ensuring secure access, and orchestrates interactions with underlying services and repositories to maintain user-specific book data within the application architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/api/CatalogController.java'>CatalogController.java</a></b></td>
																			<td style='padding: 8px;'>- Provides a REST API endpoint for searching and retrieving detailed book information from Google Books<br>- Integrates with external data sources to deliver normalized, structured book data such as titles, authors, publication years, ISBNs, and cover images, supporting the broader application’s goal of offering a comprehensive digital library catalog.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
															<!-- dto Submodule -->
															<details>
																<summary><b>dto</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.library.dto</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/UpdateStatusRequest.java'>UpdateStatusRequest.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object for updating the reading status of a book within the personal library application<br>- It encapsulates the new reading status, facilitating seamless communication between client requests and server-side processing, thereby supporting the functionality to modify and track the reading progress of library items.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/PageResponse.java'>PageResponse.java</a></b></td>
																			<td style='padding: 8px;'>- Provides a structured representation of paginated data responses within the application, facilitating consistent and efficient delivery of large datasets<br>- Integrates seamlessly with Spring Datas pagination features, enabling smooth transformation of page data into a standardized format for client consumption across the project’s architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/UpdateLibraryRequest.java'>UpdateLibraryRequest.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object for updating library entries, encapsulating user-provided information such as reading status, rating, and notes<br>- Facilitates seamless communication between client requests and backend processing within the library management system, ensuring data validation and consistency during updates<br>- Supports the overall architecture by standardizing input data for library record modifications.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/ImportByGoogleRequest.java'>ImportByGoogleRequest.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object representing a request to import a book from Google Books using its volume ID<br>- It facilitates communication within the application by encapsulating the necessary identifier for fetching and processing book data, supporting the integration of external Google Books resources into the personal library system.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/LibraryDetails.java'>LibraryDetails.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object representing detailed information about a library book, including identifiers, metadata, and descriptive attributes<br>- Facilitates structured data exchange within the application, supporting features like catalog display, search, and book management in the overall library system architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/UpdateUserBookRequest.java'>UpdateUserBookRequest.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object for updating user-specific book information within the personal library application<br>- Facilitates structured data exchange during update operations, supporting seamless modifications to user-book associations while maintaining clear separation between data layers in the overall architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/AddManualBookRequest.java'>AddManualBookRequest.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object for capturing user input when adding a new manual book entry<br>- It facilitates structured data exchange within the application, supporting the process of enriching the library catalog with detailed book information<br>- This component integrates into the broader system architecture to ensure consistent and validated data handling during book creation workflows.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/dto/LibraryRow.java'>LibraryRow.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object representing a library entry, encapsulating essential book details such as title, authors, publication year, reading status, rating, and cover image URL<br>- Serves as a structured format for transferring library data within the application, facilitating seamless communication between different layers and components of the system.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
															<!-- repo Submodule -->
															<details>
																<summary><b>repo</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.library.repo</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/repo/UserBookRepository.java'>UserBookRepository.java</a></b></td>
																			<td style='padding: 8px;'>- Provides data access methods for managing user-specific book interactions within the personal library system<br>- Facilitates retrieval, counting, and deletion of user-book relationships, supporting features like pagination, filtering by reading status, and efficient fetching of related book details<br>- Integrates seamlessly into the overall architecture to enable personalized library management and user engagement.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/repo/BookRepository.java'>BookRepository.java</a></b></td>
																			<td style='padding: 8px;'>- Provides data access methods for managing Book entities within the personal library application<br>- Facilitates retrieval, existence checks, and bulk fetching of books by various identifiers such as Google Volume ID and ISBN13<br>- Supports search functionality by title and integrates seamlessly with the overall architecture to enable efficient, organized access to book data in the system.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
															<!-- domain Submodule -->
															<details>
																<summary><b>domain</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.library.domain</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/domain/Book.java'>Book.java</a></b></td>
																			<td style='padding: 8px;'>- Defines the Book entity within the domain model, representing book records in the database<br>- It encapsulates core attributes such as title, authors, publication details, and identifiers, facilitating data persistence and retrieval<br>- Serves as a foundational component for managing and querying book data within the applications architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/domain/ReadingStatus.java'>ReadingStatus.java</a></b></td>
																			<td style='padding: 8px;'>- Defines the various reading statuses within the personal library management system, enabling users to categorize and track their progress on books<br>- Serves as a foundational component for organizing reading activities, supporting features like filtering and status updates, and integrating seamlessly with other domain entities in the applications architecture.</td>
																		</tr>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/library/domain/UserBook.java'>UserBook.java</a></b></td>
																			<td style='padding: 8px;'>- Defines the UserBook entity representing the association between users and their books within the library system<br>- Facilitates tracking of user-specific book statuses, ratings, and notes, supporting personalized library management<br>- Integrates with the overall architecture to enable efficient storage, retrieval, and management of user-book relationships in a relational database.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
														</blockquote>
													</details>
													<!-- auth Submodule -->
													<details>
														<summary><b>auth</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.com.jatin.personal_library.auth</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/AuthenticationResponse.java'>AuthenticationResponse.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the structure for authentication responses by encapsulating a token, facilitating secure communication between clients and the server within the overall authentication flow of the personal library application<br>- It supports streamlined handling of authentication tokens, ensuring consistent and efficient user session management across the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/RegisterRequest.java'>RegisterRequest.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the data structure for user registration requests within the authentication module, facilitating the transfer of essential user information during account creation<br>- Integrates seamlessly into the broader authentication and user management architecture, enabling consistent handling of registration data across the system<br>- Ensures that user input is captured and validated before account setup processes are initiated.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/AuthenticationRequest.java'>AuthenticationRequest.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the structure for capturing user authentication details, specifically email and password, within the broader security framework of the personal library application<br>- Facilitates user login processes by standardizing credential data transfer, supporting authentication workflows essential for secure access control across the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/AuthenticationService.java'>AuthenticationService.java</a></b></td>
																	<td style='padding: 8px;'>- Facilitates user registration and authentication by managing credential verification, user creation, and JWT token generation<br>- Integrates with the user repository and security components to enable secure login flows, supporting the overall architectures focus on user identity management and access control within the application.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/AuthenticationController.java'>AuthenticationController.java</a></b></td>
																	<td style='padding: 8px;'>- Provides REST endpoints for user authentication and profile retrieval within the application<br>- Facilitates user registration, login, and fetching current user details through JWT-based authorization, integrating with user data storage<br>- Serves as a central controller for managing authentication workflows, ensuring secure access and user identity management across the system.</td>
																</tr>
															</table>
															<!-- dto Submodule -->
															<details>
																<summary><b>dto</b></summary>
																<blockquote>
																	<div class='directory-path' style='padding: 8px 0; color: #666;'>
																		<code><b>⦿ src.main.java.com.jatin.personal_library.auth.dto</b></code>
																	<table style='width: 100%; border-collapse: collapse;'>
																	<thead>
																		<tr style='background-color: #f8f9fa;'>
																			<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																			<th style='text-align: left; padding: 8px;'>Summary</th>
																		</tr>
																	</thead>
																		<tr style='border-bottom: 1px solid #eee;'>
																			<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/auth/dto/CurrentUserResponse.java'>CurrentUserResponse.java</a></b></td>
																			<td style='padding: 8px;'>- Defines a data transfer object representing the current authenticated users essential details, including ID, email, display name, and role<br>- Facilitates seamless communication of user identity and permissions across the authentication and authorization components within the overall personal library applications architecture<br>- Ensures consistent and secure handling of user information throughout the system.</td>
																		</tr>
																	</table>
																</blockquote>
															</details>
														</blockquote>
													</details>
													<!--  Submodule -->
													<details>
														<summary><b></b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.com.jatin.personal_library.</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/demo/DemoController.java'>DemoController.java</a></b></td>
																	<td style='padding: 8px;'>- Provides a secure REST endpoint within the applications API layer, enabling clients to receive a simple greeting message<br>- It serves as a foundational example of implementing authenticated, versioned API routes in the project’s architecture, facilitating communication between external clients and backend services while demonstrating best practices for controller design in a Spring Boot environment.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- config Submodule -->
													<details>
														<summary><b>config</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.com.jatin.personal_library.config</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/ApplicationConfig.java'>ApplicationConfig.java</a></b></td>
																	<td style='padding: 8px;'>- Defines security configurations for user authentication and password management within the application<br>- Facilitates user detail retrieval, password encoding, and authentication management, ensuring secure access control aligned with the overall system architecture<br>- This setup integrates seamlessly with the user repository to support authentication workflows across the project.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/SecurityConfiguration.java'>SecurityConfiguration.java</a></b></td>
																	<td style='padding: 8px;'>- Defines security policies for the application by configuring JWT-based authentication, request authorization, and stateless session management<br>- It ensures protected endpoints require valid tokens, while public endpoints remain accessible, thereby safeguarding sensitive data and maintaining secure access control within the overall system architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/WebClientConfig.java'>WebClientConfig.java</a></b></td>
																	<td style='padding: 8px;'>- Provides a configured WebClient instance for interacting with the Google Books API, enabling seamless and efficient communication with external book data services within the applications architecture<br>- This setup supports the broader systems goal of integrating external bibliographic data, facilitating features like book searches and information retrieval in a reactive, non-blocking manner.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/JwtAuthenticationFilter.java'>JwtAuthenticationFilter.java</a></b></td>
																	<td style='padding: 8px;'>- Implements JWT-based authentication by intercepting incoming HTTP requests to validate tokens, extract user details, and establish security context<br>- Facilitates secure access control within the application’s architecture, ensuring only authenticated users can access protected resources<br>- Serves as a critical component in maintaining stateless, token-driven security across the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/CorsConfig.java'>CorsConfig.java</a></b></td>
																	<td style='padding: 8px;'>- Configure Cross-Origin Resource Sharing (CORS) policies to enable secure communication between the backend and frontend during development<br>- It permits requests from the local development server, allowing seamless integration and testing of client-server interactions within the project architecture<br>- This setup ensures smooth data exchange while maintaining security boundaries.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/main/java/com/jatin/personal_library/config/JwtService.java'>JwtService.java</a></b></td>
																	<td style='padding: 8px;'>- Provides JWT token management within the application, enabling secure user authentication and authorization<br>- Facilitates token creation, validation, and extraction of user details, supporting stateless session handling<br>- Integrates seamlessly with Spring Security to ensure protected access to resources, maintaining security standards across the applications architecture.</td>
																</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- test Submodule -->
			<details>
				<summary><b>test</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.test</b></code>
					<!-- java Submodule -->
					<details>
						<summary><b>java</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.test.java</b></code>
							<!-- com Submodule -->
							<details>
								<summary><b>com</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.test.java.com</b></code>
									<!-- jatin Submodule -->
									<details>
										<summary><b>jatin</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.test.java.com.jatin</b></code>
											<!-- personal_library Submodule -->
											<details>
												<summary><b>personal_library</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.test.java.com.jatin.personal_library</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/src/test/java/com/jatin/personal_library/PersonalLibraryApplicationTests.java'>PersonalLibraryApplicationTests.java</a></b></td>
															<td style='padding: 8px;'>- Validates the applications context loading within the overall Spring Boot architecture, ensuring that the core components and dependencies initialize correctly<br>- Serves as a foundational test to confirm the applications setup integrity, supporting reliable deployment and functioning of the personal library management system<br>- This test helps maintain stability as the project evolves.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- ui Submodule -->
	<details>
		<summary><b>ui</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ ui</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/eslint.config.js'>eslint.config.js</a></b></td>
					<td style='padding: 8px;'>- Defines ESLint configuration to enforce coding standards and best practices across JavaScript and JSX files within the project<br>- It integrates recommended rules for JavaScript, React hooks, and React refresh, ensuring code quality, consistency, and compatibility with modern JavaScript features<br>- This setup supports maintaining a clean, reliable, and maintainable codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/index.html'>index.html</a></b></td>
					<td style='padding: 8px;'>- Establishes the foundational HTML structure for the web applications user interface, setting up the environment for rendering React components<br>- It integrates the Vite development server, defines the main entry point, and ensures proper page setup for a seamless user experience within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Provides the core user interface for the application, enabling seamless interaction and navigation through React components<br>- Facilitates dynamic content rendering, client-side routing, and integration with backend services via Axios<br>- Serves as the visual and interactive layer within the overall architecture, ensuring a responsive and engaging user experience.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides a foundational setup for developing React applications with Vite, enabling efficient development workflows through Hot Module Replacement (HMR) and streamlined ESLint integration<br>- Facilitates rapid UI development with minimal configuration, supporting both Babel and SWC plugins for optimal refresh performance<br>- Serves as a starting point for building scalable, maintainable React projects within a modern, fast development environment.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/vite.config.js'>vite.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures the development environment for the frontend application by integrating Vite with React<br>- It streamlines the build process, enabling fast development and hot module replacement, which enhances developer productivity<br>- As part of the overall architecture, it ensures a smooth and efficient setup for the user interface layer, supporting rapid iteration and consistent performance across the project.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ ui.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/main.jsx'>main.jsx</a></b></td>
							<td style='padding: 8px;'>- Initialize the React application by rendering the main App component within a strict mode environment, ensuring adherence to best practices and enabling additional runtime checks<br>- Serves as the entry point for the user interface, orchestrating the mounting of the core application into the DOM and establishing the foundation for the entire frontend architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/App.jsx'>App.jsx</a></b></td>
							<td style='padding: 8px;'>- Defines the main routing structure for the application, managing navigation between login, registration, and library pages<br>- Facilitates seamless user flow by redirecting unauthenticated users to login and organizing page components within a client-side router, forming the foundation for user interaction and access control within the overall app architecture.</td>
						</tr>
					</table>
					<!-- components Submodule -->
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ ui.src.components</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/components/BookModal.jsx'>BookModal.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a modal interface for viewing and editing detailed information about individual books within the users library<br>- Facilitates data retrieval, display, and updates for book attributes such as title, authors, year, status, rating, and notes, supporting seamless user interactions for managing personal reading progress and preferences<br>- Integrates with backend APIs to ensure data consistency across the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- pages Submodule -->
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ ui.src.pages</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/pages/Library.jsx'>Library.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a user interface for managing a personal book library, enabling viewing, editing, deleting, and adding books<br>- Integrates with backend APIs for data retrieval and updates, supports pagination, and offers modal dialogs for detailed book interactions<br>- Serves as the central page within the applications architecture, facilitating seamless library management and user engagement.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/pages/SearchAndAdd.jsx'>SearchAndAdd.jsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates searching, previewing, and adding books to the users library through an integrated interface<br>- Enables manual entry or import from Google Books, managing search results, form inputs, and modal dialogs for streamlined book management<br>- Supports seamless integration with backend APIs to enhance the catalog with minimal user effort.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/pages/Login.jsx'>Login.jsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user authentication within the application by providing a login interface that captures credentials, manages authentication requests, handles responses, and stores session tokens<br>- Integrates seamlessly into the overall architecture to enable secure access to protected resources, ensuring a smooth user experience during sign-in and session initialization.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/pages/Register.jsx'>Register.jsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user registration by capturing input data, communicating with backend authentication endpoints, and managing user session tokens<br>- Integrates seamlessly into the overall architecture by enabling new users to create accounts, authenticate, and access personalized features within the application<br>- Ensures smooth onboarding and initial authentication flow, contributing to the platforms user management and security infrastructure.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- lib Submodule -->
					<details>
						<summary><b>lib</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ ui.src.lib</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/JatUppal/Personal-Library/blob/master/ui/src/lib/api.js'>api.js</a></b></td>
									<td style='padding: 8px;'>- Facilitates seamless communication with the backend API by configuring an Axios instance with a dynamic base URL<br>- Manages authentication tokens for secure, authorized requests, ensuring consistent and efficient data exchange across the applications frontend<br>- Serves as a centralized API client, supporting the overall architectures modularity and maintainability.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Demo

### 1) Creating An Account
<video src="/assets/videos/demo-creating-account.mp4" controls width="960" preload="metadata"></video>
[Download MP4](docs/assets/videos/demo-creating-account.mp4?raw=1)

---

### 2) Adding Books
<video src="/assets/videos/demo-adding-books.mp4" controls width="960" preload="metadata"></video>
[Download MP4](docs/assets/videos/demo-adding-books.mp4?raw=1)

---

### 3) Logging In + Features
<video src="/assets/videos/demo-logging-in.mp4" controls width="960" preload="metadata"></video>
[Download MP4](docs/assets/videos/demo-logging-in.mp4?raw=1)

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** Java
- **Package Manager:** Maven, Npm
- **Container Runtime:** Docker

### Installation

Build Personal-Library from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/JatUppal/Personal-Library
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd Personal-Library
    ```

3. **Install the dependencies:**

**Using [docker](https://www.docker.com/):**

```sh
❯ docker build -t JatUppal/Personal-Library .
```
**Using [maven](https://maven.apache.org/):**

```sh
❯ mvn install
```
**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### Usage

Run the project with:

**Using [docker](https://www.docker.com/):**

```sh
docker run -it {image_name}
```
**Using [maven](https://maven.apache.org/):**

```sh
mvn exec:java
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing

Personal-library uses the {__test_framework__} test framework. Run the test suite with:

**Using [docker](https://www.docker.com/):**

```sh
echo 'INSERT-TEST-COMMAND-HERE'
```
**Using [maven](https://maven.apache.org/):**

```sh
mvn test
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```
---

<div align="left"><a href="#top">⬆ Return</a></div>

---
