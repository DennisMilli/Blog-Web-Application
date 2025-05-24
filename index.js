$(document).ready(() => {

if (document.querySelector(".carousel-news")) {
// Carousel
const slides = document.querySelector('.carousel-news');
const slideItems = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Function to update the carousel
function updateCarousel() {
    slides.style.transform = `translateX(-${currentIndex * 55}%)`;  
}

// Previous Button Click
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slideItems.length - 1; // Loop to the last slide
  }
  updateCarousel();
});

// Next Button Click
nextButton.addEventListener('click', () => {
  if (currentIndex < slideItems.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop to the first slide
  }
  updateCarousel();
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % slideItems.length; // Move to the next slide
  slides.style.transform = `translateX(-${currentIndex * 55}%)`;
}, 5000);
};

if (document.querySelector(".nav-block")) {
// Nav-bar
let clickedNav1 = $('.nav-block div :nth-child(1)');
let clickedNav2 = $('.nav-block div :nth-child(2)');
let clickedNav3 = $('.nav-block div :nth-child(3)');

$('.nav-block').click(() => {
    clickedNav1.toggleClass('leftX');
    clickedNav2.toggleClass('middleX');
    clickedNav3.toggleClass('rightX');
    $('.side-bar').toggleClass('active')
    $('body').toggleClass('no-scroll')
})
};

if (document.querySelector("#modal")) {

//Modal
const modal = $("#modal");
const createPost = $("#create-post");
const closeModal = $(".close-modal");
let modalOpened = false;

createPost.click(() => {
  modal.addClass("active-modal");
  $('body').addClass("no-scroll");
  modalOpened = true;
  console.log(modalOpened);
})
closeModal.click(() => {
  modal.removeClass("active-modal");
  $('body').removeClass("no-scroll");
  modalOpened =  false;
  console.log(modalOpened);
})
$(document).click((event) => {
  if (event.target.id === "modal" && modalOpened) {
    console.log(event.target.id);
    console.log("Clicked outside modal!");
    modal.removeClass("active-modal");
    $('body').removeClass("no-scroll");
    modalOpened = false;
  }
});
};

if (document.querySelector("#delete-post")) {
let currentPost = null;

$("#delete-post").click(() => {
  const $button = $("#delete-post");
  const isDeleteMode = $button.text() === "Delete post";
  $button.text(isDeleteMode ? "Back" : "Delete post");
  $(".delete-button").toggleClass("active", isDeleteMode);
  currentPost?.toggleClass("toDelete", isDeleteMode);
  $("confirmationModal").removeClass("active-modal");
})

$(document).click((event) => {
  if ($(event.target).hasClass("delete-button")) {
    event.stopPropagation();
    currentPost = $(event.target).closest('.article-container');
    console.log(currentPost);
    currentPost.addClass("toDelete");
    $("#confirmationModal").addClass("active-modal");
    return;
  }
  if ($(event.target).hasClass("cancel-button")) {
    $("#confirmationModal").removeClass("active-modal");
    currentPost?.removeClass("toDelete");
    currentPost = null;
  } 
  if (event.target.classList.contains("yes-button")) {
    currentPost?.removeClass("toDelete");
    if (currentPost) {
      $("#confirmationModal").removeClass("active-modal");
      deleteThisPost(currentPost);
      currentPost = null;
    }
  }
  if (event.target.id === "confirmationModal") {
    $(".confirmationModal").addClass("flash")
    setTimeout(() => {
      $(".confirmationModal").removeClass("flash")
    }, 500);
  } 
})
  
  function deleteThisPost(postElement) {
    const postId = $(postElement).attr("data-id");
    console.log("Full URL:", `/blog/${postId}`);
    $("#delete-post").text("Delete post");
    $.ajax({
      url: `/blog/${postId}`,
      type: "DELETE",
      success: function () {
        postElement.remove();
      }, error: function(error) {
        console.error("Error deleting post:", error);
      }
    })
  } 
};

if (document.querySelector(".multipurpose-buttons")) {
  let currentPost = null;
  let post = $(".article-page");
  let multipurposeButtons = $(".multipurpose-buttons");
  let OgContent = {originalTitle: "", originalContent: ""};

  function resetEditForm(post, original = null) {
    if (original) {
      post.find(".title-of-blog").text(original.originalTitle);
      post.find(".content").html(original.originalContent);
    }
    post.find(".edit-textarea, .edit-actions").remove();
    multipurposeButtons.show();

    $("#confirmationModal").removeClass("active-modal");
  };

  function formattedArticle(rawContent) {
    if (rawContent) {
      console.log(rawContent);
      return rawContent
      .replace(/<\/?p>/gi, '')
      .replace(/(\r\n|\r|\n)/g, '<br>')
      .trim();
    }
  }
  function rawText(htmlContent) {
    if (htmlContent) {
      return htmlContent
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?[^>]+>/gi, '')
        .trim();
    }
  }
  
  function deletePostBySlug(postElement) {
    const postSlug = $(postElement).attr("data-slug");
    console.log("Full URL:", `/blog/${postSlug}`);
    $.ajax({
      url: `/blog/${postSlug}`,
      type: "DELETE",
      success: function (response) {
        console.log("Initial deletion response:", response);
        $.ajax({
          url: `/blog/${postSlug}`,
          type: "GET",
          success: function() {
              alert("Post still exists on server!");
          },
          statusCode: {
            404: function() {
            $(postElement).fadeOut(300, function() {
              $(this).remove();
              window.location.href = "/blog";
            });
            }
          },
          error: function(xhr) {
              console.error("Verification error:", xhr.status);
          }
        });
      } 
    })
  };
  
  $(document).on("click", ".like", _.debounce(function() {
    const postId = post.attr("data-id");
    $.ajax({
      url: `/posts/${postId}/like`,
      type: 'POST',
      error: function(xhr) {
        console.error("Verification error:", xhr.status);
      }
    });
  }, 300));

  $(document).on("click", ".edit", function() {
    OgContent = {
      originalTitle: post.find(".title-of-blog").text(),
      originalContent: post.find(".content").html()
    };

    console.log(OgContent);
    multipurposeButtons.hide();
    
    const textareaContent = rawText(OgContent.originalContent);

    post.find(".title-of-blog").html(`
      <textarea class="edit-textarea edited-title">${OgContent.originalTitle}</textarea>
    `);
    console.log(textareaContent);

    post.find(".content").html(`
      <textarea class="edit-textarea edited-content">${textareaContent}</textarea>
    `);
    post.append(`
      <div class="edit-actions"> 
      <button class="save-edit">Update</button>
      <button class="cancel-edit">Cancel</button>
      </div>
    `);
  });

  $(document).on("input", ".edit-textarea", function() {
    $(this).height(0).height(this.scrollHeight);
  });

  $(document).on("click", ".cancel-edit", function() {
    resetEditForm(post, OgContent);
  });
  $(document).on("click", ".save-edit", function() {
    $("#confirmationModal").addClass("active-modal");
    $(".confirmationText").text("Are you sure you want to effect these change(s)?");
  });
  $(document).on("click", "#confirmationModal .cancel-button", function() {
    if ($(this).closest(".confirmationModal").hasClass("deleteConfirmation")) {
      $("#confirmationModal").removeClass("active-modal");
    } else {
      resetEditForm(post, OgContent);
    }
  });
  $(document).on("click", "#confirmationModal .yes-button", function() {
    if ($(this).closest(".confirmationModal").hasClass("deleteConfirmation")) {
      if (currentPost) {
        $("#confirmationModal").removeClass("active-modal");
        $(".confirmationModal").removeClass("deleteConfirmation");
        deletePostBySlug(currentPost);
        currentPost = null;
      }
    } else {
    const newTitle = post.find(".edited-title").val();
    const newContent = post.find(".edited-content").val();

    post.find(".title-of-blog").text(newTitle);
    post.find(".content").html(formattedArticle(newContent));
    resetEditForm(post);
    }
  });
  $(document).on("click", "#confirmationModal", function(e) {
    console.log(e.target);
    if (e.target.id === "confirmationModal") {
      $(".confirmationModal").addClass("flash");
      setTimeout(() => $(".confirmationModal").removeClass("flash"), 500);
    }
  });

  $(document).click((event) => {
    if ($(event.target).hasClass("delete")) {
    event.stopPropagation();
    currentPost = $(event.target).closest(".multipurpose-buttons").prev('.article-page');
    console.log(currentPost);
    $("#confirmationModal").addClass("active-modal");
    $(".confirmationModal").addClass("deleteConfirmation");
    $(".confirmationText").text("Are you sure you want to delete?");
    return;
    }
  });

};

document.getElementById("post-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData (event.target);
  console.log(event.target);
  try {
    console.log("sending result to /blog");
    const response = await fetch("http://localhost:3000/blog", {
      method: "POST",
      body: formData,
    });
    console.log("Response received:", response);
    if (!response.ok) {
      const data = await response.json();
      console.log(data.message);
      console.log("error response:", data);
      throw new Error(data.message);
    }
      console.log("Request successful. Redirecting to /blog...");
      window.location.href = "/blog";
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
});

